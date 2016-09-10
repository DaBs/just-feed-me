<template>
  <div>
    <p>a service that utilizes JUST EAT's API to find random food for you. Just press the button, and we'll take care of choosing a dish for you. Isn't automation wonderful?</p>
    <button v-on:click="$root.initService" type="button">JUST FEED ME!</button>
    <template v-if="error">
      <dialog>
        <h1>{{error.headline}}</h1>
        <p>{{error.text}}</p>
        <button type="button">OK...</button>
      </dialog>
    </template>
  </div>
</template>

<script>

import Dialog from '../components/Dialog.vue';
import Map from '../components/Map.vue';

export default {
  name: 'front',

  props: ['error'],

  components: {
    Dialog
  }
}

</script>


<style>
</style>
