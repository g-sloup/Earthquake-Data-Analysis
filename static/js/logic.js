// Store API endpoint
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// ----------------------------------
// Get request for data
d3.json(earthquakeURL, function(data) {
    createFeatures(data);
    console.log(data)
});

// ----------------------------------
// Create function to style features 
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

  // Create geoJSON layer
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(earthquakeData, latlng) {
      return L.circle(latlng, {
        radius: circleSize(earthquakeData.properties.mag),
        color: circleColor(earthquakeData.properties.mag),
      });
    },
    onEachFeature: onEachFeature
  });

  createMap(earthquakes);
}

// ----------------------------------
// Create map 
function createMap(earthquakes) {

  // Add tile layers 
  var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });  

  var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
  }); 

  // Create baseMaps object to hold base layers
  var baseMaps = {
    "Street Map": streetMap,
    "Light": lightmap,
    "Outdoors": outdoors
  };

  // Create overlay object to hold overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create map object
  var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
  });
  
  // Add layer control
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
  }).addTo(myMap);

}  

// ----------------------------------
// Create Legend 



// Add legend
