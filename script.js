// Set up the map
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN_HERE';

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-95.7129, 37.0902],
	zoom: 3
});

var markers = {};

// Get the truck data
setInterval(function() {
	fetch('data.json')
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// Add markers and lines for each truck
			Object.keys(markers).forEach(function (key) {
				var found = false;
				for (var i = 0; i < data.length; i++) {
					if (data[i].truck_number === key) {
						// Update existing marker
						markers[key].marker.setLngLat(data[i].coordinates);
						markers[key].marker.getPopup().setHTML('<h3>Truck ' + data[i].truck_number + '</h3><p>Last updated: ' + data[i].timestamp + '</p>');
						markers[key].marker.getPopup().addTo(map);
						// Update existing line
						var last8hours = new Date() - 8 * 60 * 60 * 1000;
						var lineCoordinates = data[i].route.filter(function (point) {
							return new Date(point.timestamp) > last8hours;
						}).map(function (point) {
							return point.coordinates;
						});
						if (lineCoordinates.length > 1) {
							map.getSource('route-' + data[i].truck_number).setData({
								type: 'Feature',
								properties: {},
								geometry: {
									type: 'LineString',
									coordinates: lineCoordinates
								}
							});
						}
						found = true;
						break;
					}
				}
				if (!found) {
					// Truck is missing
					document.getElementById('missing-trucks').innerHTML = 'Truck ' + key + ' is missing as of ' + new Date().toLocaleString();
					map.removeLayer('route-' + key);
					map.removeSource('route-' + key);
					markers[key].marker.remove();
					delete markers[key];
				}
			});
			data.forEach(function (truck) {
				if (!(truck.truck_number in markers)) {
					// Add marker
					var marker = new mapboxgl.Marker()
						.setLngLat(truck.coordinates)
						.setPopup(new mapboxgl.Popup().setHTML('<h3>Truck ' + truck.truck_number + '</h3><p>Last updated: ' + truck.timestamp + '</p>'))
						.addTo(map);
					markers[truck.truck_number] = {marker: marker};
					// Add line
					var last8hours = new Date() - 8 * 60 * 60 * 1000;
					var lineCoordinates = truck.route.filter(function (point) {
						return new Date(point.timestamp) > last8hours;
					}).map(function (point) {
						return point.coordinates;
					});
					if (lineCoordinates.length > 1) {
						map.addLayer({
							id: 'route-' + truck.truck_number,
							type: 'line',
							source: {
								type: 'geojson',
								data: {
									type: 'Feature',
									properties: {},
									geometry: {
										type: 'LineString',
                    coordinates: lineCoordinates
									}
								}
							},
							layout: {
								'line-join': 'round',
								'line-cap': 'round'
							},
							paint: {
								'line-color': '#888',
								'line-width': 4
							}
						});
					}
				}
			});
		})
		.catch(function (error) {
			console.log('Error fetching truck data:', error);
		});
}, 5 * 60 * 1000); // Update every 5 minutes

// Add responsive design
var mapContainer = document.getElementById('map');
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

mapContainer.style.width = width + 'px';
mapContainer.style.height = height + 'px';

window.addEventListener('resize', function() {
	width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	mapContainer.style.width = width + 'px';
	mapContainer.style.height = height + 'px';
	map.resize();
});
