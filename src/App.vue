<template>
  <v-app light >
    <v-main v-bind:class="backgroundImage">
      <v-toolbar class="white">
        <v-toolbar-items>
          <v-btn text elevation-16 class="pink accent-2" to="/">Home</v-btn>
          <v-btn text class="green accent-1" to="/about">Default Cities</v-btn>
          <v-btn text class="green accent-1" to="/search">Search Cities</v-btn>
          <v-btn text class="green accent-1" to="/city">Cities</v-btn>
          <div>
            <img
              v-bind:src="require('./assets/wind-rose.png')"
              alt="The Weather Logo"
              height="100%"
            />
          </div>
        </v-toolbar-items>
      </v-toolbar>
     
      <router-view />

    </v-main>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data: function () {
    return {
      imageLink: {
        logo: "/assets/logo.png",
      },
    };
  },
  computed: {
    ...mapGetters({
      backgroundImage: 'backgroundImage'
    })
  },
    mounted: function () {
      this.$store.dispatch('fetchWeatherForStore', this.$store.state.city)
    }
};
</script>

<style lang="scss">
/* * {
  padding: 0 !important;
  margin: 0;
  box-sizing: border-box;
} */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app .cold {
  background: url("./assets/snowboard.jpg"), radial-gradient(#ccc, #333);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: multiply;
}
#app .warm {
  background: url("./assets/beach.jpg"), radial-gradient(#fff3cc, #b4b223);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.v-toolbar__content {
  padding: 0 !important;
  width: 100%;
  max-width: 100vw;
}
.v-btn__content {
  font-weight: 600;
  font-size: 1.1rem;
}
.v-toolbar__items {
  width: 100%;
  justify-content: start;
  img {
    height: 100%;
    position: absolute;
    right: 10px;
  }
}
</style>
