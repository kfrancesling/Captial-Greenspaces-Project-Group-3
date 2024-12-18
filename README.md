# Captial#  Capital Greenspaces Project - Group 3 - Carbon Sinks 

 

## About     

As part of our Technological Infrastructures of GIS course and the wider Capital Greenspaces Project at the University of Edinburgh in 2024, we have created this website to visualise our group's research findings and share them with the wider public.  
 
The research this website is based on and aims to visualise, quantifies the carbon stock of the Roseburn path in response to a tramline proposal which would destroy the path.  
 
Our website can be accessed [here](www.geos.ed.ac.uk/roseburnbiomass).  

 

## Meet the team 

Frances Lingard, Jingqi Huo, Shengying Xin, Rachel Fry, Catriona Bruce & Ellen Somersalo 

## Project directory

```plaintext 

CapitalGreenSpaces 

│-- download 

│ │-- carbon&biomass.zip 

│ │-- roseburn_path_data.zip 

│ │-- roseburn_path_report.pdf 

│-- static 

│ │-- css 

│ │ │-- rasterstyles.css 

│ │ │-- resourcestyles.css 

│ │ │-- styles.css 

│ │ │-- vectorstyles.css 

│ │-- img  

│ │-- info 

│ │ │-- boundary.json 

│ │ │-- tree_facts.json

│-- js

│ │-- mainpage.js 

│ │-- rastermap.js 

│ │-- vectormap.js

│-- rasters

│ │ │-- agbd_map_08-12_3857.tif

│ │ │-- agbd_map_08-12_3857.tif.aux.xml

│ │ │-- carbon_map_08-12_3857.tif

│ │ │-- carbon_map_08-12_3857.tif.aux.xml

│ │ │-- rastermap.html

│ │ │-- resources.html

│-- templates 

│ │-- rastermap.html 

│ │-- resources.html 

│-- app.py 

│-- fetchdata.py 

│-- rastermap.py 

│-- vectormap.py

```

## The creation of the website  

Our website was created using a wide range of softwares, libraries and coding languages. Below is a description of how each of these were used within the project. The various parts used to construct the final code can all be found in this repository, mainly under app.py, static, and template (see more under Flask). 

 

### Coding languages  

In this project, Python, JavaScript, HTML, CSS and SQL were used. The base of the code, the library contents, and the base for the maps were built using Python, the more advanced coding of the maps was done using JavaScript, the website structure was built using HTML, and the website design was built using CSS. SQL was used to build our database. 

 

### Flask 

Flask is a python based micro web framework that allows for dynamic and clean website creation. 

 

In this project, flask was used to build the application base, around which the rest of the application was built. Our flask app consists of 3 sections – app.py, static and template. App.py includes our python code, static includes our CSS and JavaScript code, and template includes our HTML code.  
 
For more information on Flask, [click here](https://flask.palletsprojects.com/en/stable/). 
 

 

 

 
### Mapbox 
Mapbox is an API (Application Programming Interface), which allows for the integration of tiles in a web map and the publishing of the maps. 
 
In this project, Mapbox was used for the tiling of our web maps and ?? 

For more information on Mapbox, [click here](https://www.mapbox.com/maps#:~:text=Frequently%20asked%20questions,map%20loads%2C%20and%20monthly%20requests.). 

 
### Folium 
Folium is a python library used in cooperation with Leaflet to produce interactive maps.  
	 
In this project, Folium was used as the base for our interactive map, on top of which the Leaflet map was added. 
 
For more information on Folium, [click here](https://python-visualization.github.io/folium/latest/). 

 

### Leaflet 

Leaflet is a library based on JavaScript, which adds detail to basemaps in web applications. 

 

In this project, we used Leaflet to create the framework, popups and markers on our maps, and to create a mobile version of the website. (?)  
 

For more information on Leaflet, [click here](https://leafletjs.com/). 

 

### AJAX 

 

The AJAX technique was used to allow the website to query the database continuously without constant reloading of the page.  
 
### Deployment of the website 
How it is deployed 

 

 

## Cloning  

To clone our website, you can take the steps outlined below. 

 

### Install the latest version of python 
To clone our data, you must have the latest version of python installed. You can find more information on this [here](https://www.python.org/downloads/) 

 

### Download the necessary packages  

You will need to have certain packages and libraries available on your device. Make sure you have the following installed:  
 
- Flask (use the command pip install Flask in your terminal) 

- Folium (use the command pip install folium in your terminal) 
- Leaflet ([install here](https://leafletjs.com/download.html)) 

??? 
 

### Clone our repository to your device  

Using the “CODE” button at the beginning of this repository to clone it to your device. 

 

###  

### 

### 

 

## Other files 

To access our documentation [click here](link). 

 

## Troubleshooting 

If you encounter any issues with our code, or need any more information or clarification, any of the emails below can be contacted for help. 

s1513646@ed.ac.uk 

s2630332@ed.ac.uk 

s2762697@ed.ac.uk 

s2674665@ed.ac.uk 

s2750126@ed.ac.uk 

s1869819@ed.ac.uk 

 

## Acknowledgements  

 

If you wish to learn more about the Roseburn path or want to learn how to best get involved, you can visit the [Save the Roseburn Path Campaign](https://www.savetheroseburnpath.com/) site.  
 
 

 -Greenspaces-Project-Group-3
