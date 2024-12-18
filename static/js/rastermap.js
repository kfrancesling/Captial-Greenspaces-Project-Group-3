document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map with specified center and zoom level
    var map = L.map('rasterMap', {
        center: [55.951359413682546, -3.2362192869186406], // Center coordinates
        zoom: 14, // Initial zoom level
        minZoom: 14, // Minimum zoom allowed
        maxBounds: [[55.94, -3.25], [55.96, -3.22]], // Bounds to prevent excessive panning
        maxBoundsViscosity: 1.0 // Makes map bounds "sticky"
    });

    // Add tile baselayer from Mapbox and give creds
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=' + mapboxApiKey, {
         attribution: '© Mapbox'
    }).addTo(map);

    // URLs for the GeoTIFF files
    var url_to_geotiff_file1 = 'static/rasters/agbd_map_08-12_3857.tif';
    var url_to_geotiff_file2 = 'static/rasters/carbon_map_08-12_3857.tif';

    // Colour functions for biomass and carbon
    function biomassColour(value) {
        // Return color based on value ranges for biomass
        if (value < 1) return "#571b13";
        if (value <= 10) return "#f0efce";
        if (value <= 20) return "#c5e28f";
        if (value <= 30) return "#7cbc5e";
        if (value <= 40) return "#3a9230";
        if (value <= 50) return "#25651f";
        if (value <= 60) return "#174814";
        return "#0e220d"; // Default color for fallback
    }

    function carbonColour(value) {
        // Return color based on value ranges for carbon
        if (value < 1) return "#fcfdbf";
        if (value <= 250) return "#ddb99c";
        if (value <= 500) return "#e4653f";
        if (value <= 750) return "#b73b18";
        if (value <= 1000) return "#79210d";
        return "#000004"; // Default color for fallback
    }

    // Function to create a legend element
    function createLegend(title, legendItems) {
        var legendContainer = L.DomUtil.create('div', 'legend');

        // Create a title element for the legend
        var titleElement = document.createElement('div');
        titleElement.className = 'legend-title';
        titleElement.textContent = title;
        legendContainer.appendChild(titleElement);

        legendItems.forEach(function(item) {
            // Create a color box and label for each legend item
            var colourBoxElement = document.createElement('span');
            colourBoxElement.className = 'colour-box';
            colourBoxElement.style.backgroundColor = item.color;

            var labelElement = document.createElement('span');
            labelElement.textContent = item.label;

            var legendRow = document.createElement('div');
            legendRow.appendChild(colourBoxElement);
            legendRow.appendChild(labelElement);

            legendContainer.appendChild(legendRow);
        });

        return legendContainer;
    }

    // Define legend items for biomass
    var biomassLegendTitle = 'Biomass (kg/m2)'; // Insert title here
    var biomassLegendItems = [
        { color: "#571b13", label: "<1" },
        { color: "#f0efce", label: "1-10" },
        { color: "#c5e28f", label: "11-20" },
        { color: "#7cbc5e", label: "21-30" },
        { color: "#3a9230", label: "31-40" },
        { color: "#25651f", label: "41-50" },
        { color: "#174814", label: "51-60" },
        { color: "#0e220d", label: "61-62.23" }
    ];

    // Define legend items for carbon
    var carbonLegendTitle = 'Carbon (kg)'; // Insert title here
    var carbonLegendItems = [
        { color: "#fcfdbf", label: "<1" },
        { color: "#ddb99c", label: "1-250" },
        { color: "#e4653f", label: "251-500" },
        { color: "#b73b18", label: "501-750" },
        { color: "#79210d", label: "751-1000" },
        { color: "#000004", label: "1001-1120" }
    ];

    // Function to fetch and add a raster layer
    function addLayer(url, layerName, colourFn) {
        return fetch(url)
            .then(response => response.arrayBuffer()) // Convert fetched data to array buffer
            .then(arrayBuffer => parseGeoraster(arrayBuffer)) // Parse buffer to georaster
            .then(georaster => {
                // Create a new raster layer with georaster data
                var geolayer = new GeoRasterLayer({
                    georaster: georaster,
                    opacity: 0.9, // Set layer transparency
                    resolution: 256, // Res for data display
                    // Map pixel values to colors
                    pixelValuesToColorFn: function(pixelValues) {
                        var pixelValue = pixelValues[0];
                        if (pixelValue === georaster.noDataValue) return null;
                        return colourFn(pixelValue);
                    }
                });
                return geolayer; // Return the gen layer
            })
            .catch(error => {
                console.error(`Error parsing ${layerName} GeoTIFF:`, error); // Log any error
            });
    }

    // Add both raster layers using promise all
    Promise.all([
        addLayer(url_to_geotiff_file1, 'Layer 1', biomassColour),
        addLayer(url_to_geotiff_file2, 'Layer 2', carbonColour)
    ]).then(both_layers => {
        var layer1 = both_layers[0];
        var layer2 = both_layers[1];

        // Add the first layer and its legend by default
        if (layer1) {
            layer1.addTo(map);
            var currentLegend = L.control({ position: 'bottomright' });
            currentLegend.onAdd = function() {
                return createLegend(biomassLegendTitle, biomassLegendItems);
            };
            currentLegend.addTo(map);
        } else {
            console.error('Layer 1 is not valid');
        }

        // Set up an info box in the bottom-left to display data on pointer interaction
        var infobox = L.control({ position: 'bottomleft' });

        infobox.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };

        infobox.update = function(props) {
            this._div.innerHTML = props ? `Value: ${props}` : 'Less than 1';
        };

        infobox.addTo(map);

        // Function to check for touch devices
        function isTouchDevice() {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        }

        // Attach appropriate event based on device type
        function attachEvent() {
            var eventType = isTouchDevice() ? 'click' : 'mousemove';

            map.on(eventType, function(e) {
                var lat = e.latlng.lat;
                var lng = e.latlng.lng;

                // Convert coordinates to map projection
                var projected = proj4('EPSG:4326', 'EPSG:3857', [lng, lat]);
                var x = projected[0];
                var y = projected[1];

                var activeLayer = map.hasLayer(layer1) ? layer1 : layer2;
                var georaster = activeLayer.options.georaster;
                var noDataValue = georaster.noDataValue;
                
                // Fetch and display raster data based on coords
                if (x >= georaster.xmin && x <= georaster.xmax && y >= georaster.ymin && y <= georaster.ymax) {
                    var rasterData = geoblaze.identify(georaster, [x, y]);
                    if (rasterData && rasterData[0] !== noDataValue) {
                        infobox.update(rasterData[0]);
                    } else {
                        infobox.update('Out of raster bounds');
                    }
                }
            });
        }

        // Attach event for updating infobox based on user interaction
        attachEvent();

        // Function to toggle between layers and legends
        function toggleLayer(checkedLayer, uncheckedLayer, checkedLegendTitle, checkedLegendItems) {
            if (map.hasLayer(uncheckedLayer)) {
                map.removeLayer(uncheckedLayer);
            }
            if (!map.hasLayer(checkedLayer)) {
                map.addLayer(checkedLayer);
                map.removeControl(currentLegend);
                currentLegend = L.control({ position: 'bottomright' });
                currentLegend.onAdd = function() {
                    return createLegend(checkedLegendTitle, checkedLegendItems);
                };
                currentLegend.addTo(map);
            }
        }

        // Control for toggling between the raster layers
        var rasterControl = L.control({ position: 'topright' });
        rasterControl.onAdd = function(map) {
            var div = L.DomUtil.create('div');
            div.style.backgroundColor = 'white';
            div.style.padding = '10px';

            // Radio button for biomass layer selec
            var biomassLabel = document.createElement('label');
            biomassLabel.style.display = 'block';
            var biomassRadio = document.createElement('input');
            biomassRadio.type = 'radio';
            biomassRadio.name = 'layer';
            biomassRadio.id = 'biomass';
            biomassRadio.checked = true;
            biomassRadio.addEventListener('click', function() {
                toggleLayer(layer1, layer2, biomassLegendTitle, biomassLegendItems);
            });
            biomassLabel.appendChild(biomassRadio);
            biomassLabel.appendChild(document.createTextNode('Biomass'));

            // Radio button for carbon layer selec
            var carbonLabel = document.createElement('label');
            carbonLabel.style.display = 'block';
            var carbonRadio = document.createElement('input');
            carbonRadio.type = 'radio';
            carbonRadio.name = 'layer';
            carbonRadio.id = 'carbon';
            carbonRadio.addEventListener('click', function() {
                toggleLayer(layer2, layer1, carbonLegendTitle, carbonLegendItems);
            });
            carbonLabel.appendChild(carbonRadio);
            carbonLabel.appendChild(document.createTextNode('Carbon'));

            div.appendChild(biomassLabel);
            div.appendChild(carbonLabel);

            return div; // return control UI
        };

        rasterControl.addTo(map);  // add contrl to map
    });
});
