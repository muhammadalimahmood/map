var map;
var countries = ["Algeria","Bangladesh","Bulgaria","Cambodia","Egypt","Ethiopia","Hong-Kong","Hungary","Indonesia","Libya","Macedonia","Malawi","Malaysia","Marcedonia","Morocco","Myanmar","Oman","Pakistan","Palestine","Philippines","Romania","Saudi Arabia","Serbia","Sudan","Tanzania","Tunisia","Turkey","United Arab Emirates","Vietnam"];

function initMap() {
  // The map, centered at Uluru
  map = new google.maps.Map(
      document.getElementById('map'), {zoom: 2, center: {lat: 15, lng: 0}});
  // The marker, positioned at Uluru

    $.getJSON("data.json", function (data) {
    console.log(data);
    // $.each(data, function (index, value) {
    //   let longitude = value.geometry.coordinates[0];
    //   let latitude = value.geometry.coordinates[1]
    //   let place  = {lat: latitude, lng: longitude};
    //   if (longitude !=0){
    //   let marker = new google.maps.Marker({position: place, map: map});
    //   }
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var markers = data.map(function(entry, i) {
        let longitude = entry.geometry.coordinates[0];
        let latitude = entry.geometry.coordinates[1];
        let place  = {lat: latitude, lng: longitude};
        if (longitude !=0){
          var contentString = `<div>
          <h2>${entry.properties.name}</h2>
          <p><b>Address: </b>${entry.properties.address} ${entry.properties.city} ${entry.properties.country}</p>
          <p><b>Email: </b>${entry.properties.email}</p>
          <p><b>Contact #: </b>${entry.properties.phone}</p>
      </div>`;
    
      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 300
      });
        let marker = new google.maps.Marker({
            position: place,
            label: entry.properties.name[0],
            animation: google.maps.Animation.DROP
          });
          marker.addListener('mouseover', function() {
            infowindow.open(map, marker);
          });
          marker.addListener('mouseout', function() {
            infowindow.close();
          });
          return marker;         
        }
      });
      

      var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: '../map1/images/m'});
    // });

    countries.map(function(country, i){
      $('#country').append(`<option value="${country}">${country}</option>`);
    });

    document.getElementById('country').addEventListener(
      'change', setAutocompleteCountry);
  });
  //var mydata = JSON.parse(data);
  //console.log(mydata);
  //var marker;
  // array.forEach(element => {
    
  // });
 // marker = new google.maps.Marker({position: uluru, map: map});
}

function setAutocompleteCountry() {
  var country = document.getElementById('country').value;
  if (country == 'all') {
    //autocomplete.setComponentRestrictions({'country': []});
    map.setCenter({lat: 15, lng: 0});
    map.setZoom(2);
  } else {
    //autocomplete.setComponentRestrictions({'country': country});
    
    // map.setCenter(countries[country].center);
    // map.setZoom(countries[country].zoom);
    
    var geocoder = new google.maps.Geocoder();
    console.log(country);
    geocoder.geocode( { 'address': country}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
    map.setCenter(results[0].geometry.location);
    map.fitBounds(results[0].geometry.viewport);
    }
    });
  }
}