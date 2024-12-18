from flask import Flask, render_template, send_from_directory
import os
from vectormap import vectormap_bp
from rastermap import rastermap_bp

# Initialise the flask app
app = Flask(__name__)

# Register blueprints for modular routing
app.register_blueprint(vectormap_bp, url_prefix='/vectormap')
app.register_blueprint(rastermap_bp, url_prefix='/rastermap')

@app.route('/')
def index():
    """ 
    Renders the homepage

    Returns:
        str: The rendered template for the index page.
     
    """
    return render_template('index.html')

@app.route('/resources')
def resources():
    """
    Renders the resources page.

    Returns:
        str: The rendered template for the resources page.
    """
    return render_template('resources.html')

@app.route('/vectormap')
def vector_map():
     """
    Renders the vector map page with a Mapbox API key.

    Returns:
        str: The rendered template for the vector map page.
    
    Raises:
        RuntimeError: If MAPBOX_API_KEY isn't set.
    """
     mapbox_key = os.getenv('MAPBOX_API_KEY')
     if not mapbox_key:
        raise RuntimeError("MAPBOX_API_KEY is not set")
     return render_template('map.html', mapbox_key=mapbox_key)

@app.route('/rastermap')
def raster_map():
    """
    Renders the raster map page with a Mapbox API key.

    Returns:
        str: The rendered template for the raster map page.

    Raises:
        RuntimeError: If MAPBOX_API_KEY isnt set.
    """
    mapbox_key = os.getenv('MAPBOX_API_KEY')
    if not mapbox_key:
        raise RuntimeError("MAPBOX_API_KEY is not set")
    return render_template('rastermap.html', mapbox_key=mapbox_key)

@app.route('/download/<filename>')
def download_file(filename):
    """
    Serves files from the 'download' directory.

    Args:
        filename (str): The name of the file to download.

    Returns:
        Response: The file response for downloading the specified file.
    """
    return send_from_directory('download', filename, as_attachment=True)


if __name__ == '__main__':
    # Run the application with debug enabled
    app.run(debug=True)
