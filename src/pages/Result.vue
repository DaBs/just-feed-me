<template>
  <div>
    <div class="map">
    </div>
    <button type="button" v-on:click="gotoStart">TRY AGAIN</button>
  </div>
</template>


<script>

import Map from '../components/Map.vue';

export default {
  name: 'map',

  components: {
    Map
  },

  data() {
    return {
      map: null,
      point: null,
      marker: null,
      infowindow: null
    }
  },

  methods: {
    gotoStart: function() {
      this.$router.go({name: 'front'});
    }
  },


  ready() {
    this.map = new google.maps.Map(document.querySelector('.map'), {
      zoom: 15,
      center: {lat: this.$root.restaurant.Latitude, lng: this.$root.restaurant.Longitude},
      disableDefaultUI: true,
      styles: [
          {
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#444444"
                  }
              ]
          },
          {
              "featureType": "administrative.country",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#f2f2f2"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "saturation": -100
                  },
                  {
                      "lightness": 45
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#e15454"
                  },
                  {
                      "visibility": "on"
                  }
              ]
          }
      ]
    });
    this.point = Object.assign(this.$root.restaurant, {position: {lat: this.$root.restaurant.Latitude, lng: this.$root.restaurant.Longitude}});

    this.infowindow = new google.maps.InfoWindow({
      content: '<div><img src="' + this.point.Logo[0].StandardResolutionURL + '"><h2>' + this.point.Name +'</h2><p>Your dish for today is <a href="' + this.point.Url + '">' + this.$root.dish.name +'</a><br/>from the food category ' + this.$root.dish.category.name + '</p></div>'
    });

    this.marker = new google.maps.Marker({
      position: this.point.position,
      map: this.map,
      title: this.point.Name,
      icon: {
        path: 'M306,9.4c-38.5,0-189.2-4.8-189.2,174.7S306,323.6,306,602.6c0-279,189.2-238.9,189.2-418.4S344.5,9.4,306,9.4zM306,260.7c-43.1,0-78.1-35-78.1-78.1c0-43.1,35-78.1,78.1-78.1s78.1,35,78.1,78.1C384.1,225.7,349.1,260.7,306,260.7z',
        fillColor: '#CE2029',
        fillOpacity: 1,
        scale: 0.05
      }
    });

    this.infowindow.open(this.map, this.marker);

    this.marker.addListener('click', () => {
      this.infowindow.open(this.map, this.marker);
    });

    this.$watch('point', (newVal, oldVal) => {
      this.marker.setMap(null);
      this.marker = new google.maps.Marker({
        position: newVal.position,
        map: this.map
      });
    });
  }
}

</script>

<style lang="scss" scoped="true">

.map {
  max-height: 450px;
  width: 100%;
  height: 100%;
}

</style>
