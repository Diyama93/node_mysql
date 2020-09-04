var map;
function initMap() {
  map = new google.maps.Map(
      document.getElementById('map'),
      {center: new google.maps.LatLng(48.864591, 2.345315), zoom: 13});



  var features = [
    {
      position: new google.maps.LatLng(48.847181, 2.318902),
      title: 'azerty'
    }, {
      position: new google.maps.LatLng(48.865755, 2.345950),
      title: 'azdrtherty'
    }, {
      position: new google.maps.LatLng(48.881946, 2.343266),
      title: 'azertgfuuyuy'
    }, {
      position: new google.maps.LatLng(48.850949, 2.377831),
      title: 'azeoghertzergtrty'
    }, {
      position: new google.maps.LatLng(48.884995, 2.313030),
      title: 'azertghreyg587y'
    }, {
      position: new google.maps.LatLng(48.820801, 2.332434),
      title: 'az6582782378erty'
    }, {
      position: new google.maps.LatLng(48.822470, 2.373720),
      title: 'azertsergsegry'
    }
  ];

  // Create markers.
  for (var i = 0; i < features.length; i++) {
      marker = new google.maps.Marker({
      position: features[i].position,
      icon: 'map/icons/nature.png',
      title: features[i].title,
      map: map
    });
    
    var content = '<h3>'+features[i].title+'</h3>'
    + '<a href="http://www.locronan-tourisme.com/" target="_blank">Site de l office de tourisme de la ville</a>'
    + '<br/><img src="map/icons/leaf.png" width="200px" />';

    var infoWindow = new google.maps.InfoWindow()

    google.maps.event.addListener(marker,'click',(function(marker,content,infoWindow) {
      return function() {
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      };
    })(marker,content,infoWindow));

    };

  }
