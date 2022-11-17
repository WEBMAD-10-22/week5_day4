document.addEventListener('DOMContentLoaded', () => {
  function startMap() {
    const ironhackBCN = {
      lat: 41.3977381,
      lng: 2.190471916,
    };

    const albacete = {
      lat: 38.9921979,
      lng: -1.678099,
    };

    const createMarker = (position, title, map) => {
      new google.maps.Marker({
        position,
        map,
        title,
      });
    };

    const createMap = (center) => {
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: center,
      });
      return map;
    };

    const geolocationAndCenterMap = (map) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            console.log('center: ', center);
            map.setCenter(center);
          },
          function () {
            console.log('Error in the geolocation service.');
          }
        );
      } else {
        console.log('Browser does not support geolocation.');
      }
    };

    const createRoute = (directionRequest, map) => {
      const directionsService = new google.maps.DirectionsService();
      const directionsDisplay = new google.maps.DirectionsRenderer();
      directionsService.route(directionRequest, function (response, status) {
        if (status === 'OK') {
          // everything is ok
          directionsDisplay.setDirections(response);
          console.log(response);
        } else {
          // something went wrong
          window.alert('Directions request failed due to ' + status);
        }
      });
      directionsDisplay.setMap(map);
    };

    const markersRestaurants = (restaurants, map) => {
      restaurants.forEach((restaurant) => {
        const location = {
          lat: restaurant.location.coordinates[1],
          lng: restaurant.location.coordinates[0],
        };
        createMarker(location, restaurant.name, map);
      });
    };

    const getRestaurants = (map) => {
      axios
        .get('/restaurants')
        .then((response) => {
          const restaurants = response.data;
          markersRestaurants(restaurants, map);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const map = createMap(albacete);
    const markers = [
      {
        location: ironhackBCN,
        title: 'Barcelona',
      },
      {
        location: albacete,
        title: 'Albacete',
      },
    ];
    markers.forEach((marker) => {
      createMarker(marker.location, marker.title, map);
    });
    
    getRestaurants(map);

    geolocationAndCenterMap(map);
    const directionRequest = {
      origin: { lat: 40.3977381, lng: 2.190471916 },
      destination: 'Madrid, ES',
      travelMode: 'DRIVING',
    };
    createRoute(directionRequest, map);
  }

  startMap();
});
