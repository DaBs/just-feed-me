<template>
  <main class="{{$route.path.substr(1)}}">
    <h1>JUST FEED ME</h1>
    <router-view></router-view>
  </main>
</template>


<script>

import Vue from 'vue';

import address from './helpers/address.js';
import { JustEatAPI } from './helpers/api.js';

export default Vue.extend({


  data() {
    return {
      latlng: null,
      zip: null,
      country: null,
      error: null,
      api: null,
      restaurants: [],
      restaurant: null,
      menu: null,
      dish: null
    }
  },


  methods: {
    initService: function() {
      if (!navigator.geolocation) this.error = {headline: 'No geolocation available', text: 'Unfortunately, your browser doesn\'t support geolocation :('};
      navigator.geolocation.getCurrentPosition(data => {
        const geocoder = new google.maps.Geocoder;
        this.latlng = {lat: data.coords.latitude, lng: data.coords.longitude};
        geocoder.geocode({'location': this.latlng}, (results, status) => {
          console.log(results);
          if (status === 'OK' && results[1]) {
            const result = results[0];
            this.zip = address.getAddressComponent(result, 'postal_code').short_name;
            this.country = address.getAddressComponent(result, 'country').short_name;
            this.api = new JustEatAPI(this.country);
            this.api.getRestaurants(this.zip).then(result => {
              const data = JSON.parse(result.body.res.text);
              this.restaurants = data.Restaurants;
              this.restaurant = this.restaurants[Math.floor(Math.random() * this.restaurants.length) + 1];
              return this.api.getMenu(this.restaurant.Id);
            }).then(result => {
              if (result.err) throw result.err;
              const data = JSON.parse(result.body.res.text);
              const newMenu = [];
              data.Menu.Categories.forEach(category => {
                category.MenuItems.forEach(menuitem => {
                  newMenu.push({name: menuitem.Name, productId: menuitem.Products[0].ProductId, category: {name: category.Name, description: category.Description, categoryId: category.Id}});
                });
              });
              this.menu = newMenu;
              this.dish = this.menu[Math.floor(Math.random() * this.menu.length) + 1];
              this.$router.go({name: 'result'});
            });
          } else {
            this.error = {headline: 'No results found', text: 'We\'re sorry, but for some reason, your geolocation didn\'t show up any results.'};
          }
        });
      })
    }
  }
});

</script>

<style>
</style>
