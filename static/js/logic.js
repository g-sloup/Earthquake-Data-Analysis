// Store API endpoint inside queryUrl
var earthquakeURL = "https://https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// Get request for data
d3.json(earthquakeURL, function(data) {
    console.log(data)
    createFeatures(data);
  });

  
function createFeatures(earthquakeData) {

  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // Create radius function
  function circleSize(magnitude) {
    return magnitude ** 2
  }

  // Function to return circle color
  function circleColor(magnitude) {
    if (magnitude < 1) {
      return "blue"
    }
    else if (magnitude < 2) {
      return "green"
    }
    else if (magnitude < 3) {
      return "yellow"
    }
    else if (magnitude < 4) {
      return "orange"
    }
    else if (magnitude < 5) {
      return "red"
    }
    else {
      return "white"
    }
  }
}
  
// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite",
    accessToken: API_KEY
  }).addTo(myMap);



// Define variable for API endpoint

// GET request the URL and send data.features object to createFeatures function
  // 



// Define a function to run once for each feature in the features array
// Give each feature a popup describing the place and time of earthquake

// Create a GeoJSON layer containing the features array on the dearthquakeData object
// Run the onEachFeature function once for each piece of data in the array

// Send earthquakes layer to the createMap function

// Define streetmap and lightmap layers

//Define baseMaps object to hold base layers

//Create overlay object to hold overlay layer

// Create map object, giving it the streetma and earthquakes layers to display on load
var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 11
  layers: [lightmap, earthQuakes]
});


// Create a layer control
// Pass in baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: true
}).addTo(myMap);

// Set up the legend



  // Add legend



