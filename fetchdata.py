import cx_Oracle
import os
import sys
import logging
import json
from pathlib import Path
    
def get_password(passfile='databasepassword.txt'):
    """
    Reads the database password from a specified file.

    Args:
        passfile (str): The file name where the password is stored.

    Returns:
        str: The password read from the file.

    Raises:
        SystemExit: If the password file is not found.
    """
    home = Path.home()
    passfile = os.path.join(home, passfile)
    try:
        with open(passfile) as file:
            pw = file.readline().strip()
        return pw
    except FileNotFoundError as detail:
        logging.error(f'Password file not found: {detail}')
        sys.exit()
    
# Get the db password
password = get_password()

def load_tree_facts():
    """
    Loads tree facts from a JSON file.

    Returns:
        dict: The tree facts data, or an empty dictionary if the file is not found.
    """
    path = os.path.join('static', 'info', 'tree_facts.json')
    try:
        with open(path, 'r') as file:
            facts = json.load(file)
        return facts
    except FileNotFoundError:
        return {}

def get_tree_data(min_biomass=None, max_biomass=None):
    """
    Fetches tree data from the database, optionally filtered by biomass range.

    Args:
        min_biomass (int, optional): Minimum biomass value for filtering.
        max_biomass (int, optional): Maximum biomass value for filtering.

    Returns:
        list: A list of tuples containing tree data from the database.
    """
    conn = cx_Oracle.connect(user="s1513646", password=password, dsn="geoslearn")
    cursor = conn.cursor()
    
    if min_biomass is not None and max_biomass is not None:
        query = """
            SELECT *
            FROM s2750126.trees
            WHERE dw_biomass BETWEEN :min_biomass AND :max_biomass
        """
        cursor.execute(query, min_biomass=min_biomass, max_biomass=max_biomass)
    else:
        query = """
            SELECT *
            FROM s2750126.trees
        """
        cursor.execute(query)
    
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data
