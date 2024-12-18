#  Capital Greenspaces Project - Group 3 - Carbon Sinks 

 

## About     

As part of our Technological Infrastructures of GIS course and the wider Capital Greenspaces Project at the University of Edinburgh in 2024, we have created this website to visualise our group's research findings and share with policy makers and the interested public. 

 
The research this website is based on and aims to visualise, quantifies the carbon stock of the Roseburn path in response to a tramline proposal which would destroy the path.  
 
Our website can be accessed [here](www.geos.ed.ac.uk/roseburnbiomass).  

 

## Meet the team 

Frances Lingard, Jingqi Huo, Rachel Fry, Catriona Bruce, Shengying Xin & Ellen Somersalo 

 

## The creation of the website  

Our website was created using a wide range of softwares, libraries and coding languages. Below is a description of how each of these were used within the project. The various parts used to construct the final code can all be found in this repository, mainly under app.py, static, and template (see more under Flask). 

 

### Coding languages  

In this project, Python, JavaScript, HTML, CSS and SQL were used. The base of the code, the library contents, and the base for the maps were built using Python, the more advanced coding of the maps was done using JavaScript, the website structure was built using HTML, and the website design was built using CSS. SQL was used to build our database. 

 

### Flask 

Flask is a python based micro web framework that allows for dynamic and clean website creation. 

In this project, flask was used to build the application base, around which the rest of the application was built. Our flask app consists of 3 subdirectories– app.py, static and template. App.py includes our python code, static includes our CSS and JavaScript code, and template includes our HTML code.  
 
For more information on Flask, [click here](https://flask.palletsprojects.com/en/stable/). 


 
### Mapbox 
Mapbox is an API (Application Programming Interface), which allows for the integration of tiles in a web map and the publishing of the maps. 
 
In this project, Mapbox was used for the tiling of our web maps and rendering the API key for map functionality  
For more information on Mapbox, [click here](https://www.mapbox.com/maps#:~:text=Frequently%20asked%20questions,map%20loads%2C%20and%20monthly%20requests.). 

 

### Leaflet 

Leaflet is a library based on JavaScript, which adds detail to basemaps in web applications. 

In this project, we used Leaflet to create the framework, display the satellite background for realistic visualization, provide OpenStreetMap (OSM) for cleaner view and markers on our maps. Based on the framework, we added points, polygons and boundaries by leaflet in further process. 
 
For more information on Leaflet, [click here](https://leafletjs.com/). 

 

### cx_Oracle 

Cx_Oracle is a python extension which allows python to retrieve data from an Oracle database. 

In this project, it was used to enable dynamic querying of data from our Oracle database on our maps. 
 
For more information on cx_Oracle, [click here](https://oracle.github.io/python-cx_Oracle/). 

 

### Additional modules 
On top of the already listed libraries, we also made use of os, sys, logging and pathlib in our python code. These are modules available in the standard Python distribution package.  

 

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
 
- Flask (use the command ```pip install Flask in your terminal```) 

- Folium (use the command ```pip install folium in your terminal```) 
- Leaflet ([install here](https://leafletjs.com/download.html)) 

- cx_Oracle ([install here](https://oracle.github.io/python-cx_Oracle/)) 
 


### Clone our repository to your device  

Use the “CODE” button at the beginning of this repository to download a zip file or clone it to your device using the link. 

 

### Setting environment variables 

An environment variable is a dynamic value in an operating system that can affect the way running processes behave. They are often used to configure various aspects of system settings or software applications. And it will be used to generate different basemaps. It needs to be set as ‘MAPBOX_API_KEY’ in terminal, and the whole command is shown below: 

On Windows: 

set MAPBOX_API_KEY= pk.eyJ1Ijoia2ZyYW5jZXNsaW5nIiwiYSI6ImNtNHNnMDIzajAwZnEybHFtMXdwM3JlOXEifQ.8HO4zb1PGp2Pa7O7kWKbFw 

On Linux or Mac: 

export MAPBOX_API_KEY= pk.eyJ1Ijoia2ZyYW5jZXNsaW5nIiwiYSI6ImNtNHNnMDIzajAwZnEybHFtMXdwM3JlOXEifQ.8HO4zb1PGp2Pa7O7kWKbFw 



### Password file 

 

 

### Opening the data 

Navigate to the correct directory in your terminal and enter the text “python3 app.py”. This is not working right now, due to key error?  

 

### 

### 

 

## Other files 

To access our documentation [click here](add link to github file). 

 

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
 
 

 # Captial-Greenspaces-Project-Group-3
