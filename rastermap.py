from flask import Blueprint, send_from_directory

# Create ratser blueprint
rastermap_bp = Blueprint('rastermap', __name__, static_folder='static')

@rastermap_bp.route('/rasters/<path:filename>')
def rasters(filename):
    """
    Serves raster files from the 'static/rasters' directory.

    Args:
        filename (str): The path to the raster file to be served.

    Returns:
        Response: The file response for the specified raster file.
    """
    return send_from_directory('static/rasters', filename)
