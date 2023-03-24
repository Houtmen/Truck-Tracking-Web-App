# Truck-Tracking-Web-App
This web app displays the real-time location of trucks for a logistic shipping company. The app fetches data from a server every 5 minutes and plots the location of each truck on a map. The app also shows the route traveled by each truck in the last 8 hours.

## Technologies Used
HTML
CSS
JavaScript
Mapbox GL JS
Setup
Clone the repository to your local machine.
Open index.html in a web browser.
Usage
The app shows the real-time location of trucks on a map. Each truck is represented by a marker on the map, and its current location is displayed when you hover over the marker. The app also shows the route traveled by each truck in the last 8 hours. The route is displayed as a line on the map.

## Features
Real-time location tracking of trucks
Display of truck number and current location when hovering over a marker
Display of truck routes for the last 8 hours

## Data Format
The app fetches data from a JSON file called data.json on the server where it is hosted. The data.json file should contain a JSON object with an array of truck data objects. Each truck data object should have the following properties:

name: the name of the truck (string)
number: the truck number (string or number)
location: an array with the latitude and longitude of the truck's current location (e.g. [51.509865, -0.118092])
last_updated: the time when the truck's location was last updated (string in ISO 8601 format)
Here is an example of a data.json file with two truck data objects:

{
  "trucks": [
    {
      "name": "Truck 1",
      "number": "123",
      "location": [51.509865, -0.118092],
      "last_updated": "2022-04-01T13:37:00Z"
    },
    {
      "name": "Truck 2",
      "number": "456",
      "location": [51.511482, -0.116894],
      "last_updated": "2022-04-01T13:40:00Z"
    }
  ]
}

## Improvements
Allow users to filter trucks by route, destination, or other criteria
Allow users to search for a specific truck by number or other criteria
Allow users to click on a truck marker to see more information, such as the driver's name, the truck's current speed, or the estimated time of arrival
Improve error handling for cases where a truck is missing or the server is unavailable

## Credits
This web app was created by Houtman for a logistics shipping company. It uses the Mapbox GL JS library for map rendering and data visualization.
