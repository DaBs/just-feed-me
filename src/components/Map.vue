<template>
  <div>
    <div class="map">
    </div>
  </div>
</template>


<script>

export default {
  name: 'map',

  props: ['items', 'center'],

  data() {
    return {
      map: null,
      points: []
    }
  },


  ready() {
    this.map = new google.maps.Map(document.querySelector('.map'), {
      zoom: 15,
      center: this.center,
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
    this.points = this.items.restaurants.map(item => {
      return Object.assign(item, {position: {lat: item.Latitude, lng: item.Longitude}});
    });

    this.points.forEach(item => {
      const marker = new google.maps.Marker({
        position: item.position,
        map: this.map
      });
    });

    this.$watch('points', (newVal, oldVal) => {
      const newPoints = newVal.filter(item => {
        return oldVal.indexOf(item) < 0;
      });
      newPoints.forEach(item => {
        const marker = new google.maps.Marker({
          position: item.position,
          map: this.map
        });
      })
    });
  }
}

</script>

<style lang="scss" scoped="true">

.map {
  margin-top: 100px;
  max-height: 250px;
  width: 100%;
  height: 100%;

}

</style>
