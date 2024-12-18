from flask import Blueprint, jsonify, request
from fetchdata import get_tree_data, load_tree_facts # Loading in functions from fetchdata.py

# Create blueprint for vector map routes
vectormap_bp = Blueprint('vectormap', __name__)

@vectormap_bp.route('/species')
def species_data():
    """
    Fetches and returns data on tree species.

    Returns:
        Response: JSON response containing tree species data or an error message.
    """
    try:
        tree_data = get_tree_data()
        return jsonify(tree_data)
    except Exception as e:
        return jsonify({'error': str(e)})

@vectormap_bp.route('/biomass')
def biomass_data():
    """
    Fetches and returns tree data filtered by biomass range.

    Query Parameters:
        min_biomass (int): Minimum biomass value.
        max_biomass (int): Maximum biomass value.

    Returns:
        Response: JSON response containing filtered tree data or an error message.
    """
    min_biomass = request.args.get('min_biomass', type=int)
    max_biomass = request.args.get('max_biomass', type=int)
    if min_biomass is not None and max_biomass is not None:
        try:
            tree_data = get_tree_data(min_biomass, max_biomass)
            return jsonify(tree_data)
        except Exception as e:
            return jsonify({'error': str(e)})
    else:
        return jsonify({'error': 'Biomass range not specified'})

@vectormap_bp.route('/facts')
def facts():
        """
    Loads and returns tree facts.

    Returns:
        Response: JSON response containing tree facts.
    """
        tree_facts = load_tree_facts()
        return jsonify(tree_facts)
