<template>
  <div class="about" v-bind:class="{ warm: backgroundCheck }">
    <h2>About</h2>
    <weather-item city="Hawaii"></weather-item>
    <weather-item city="Chur"></weather-item>
    <weather-item city="Hamburg"></weather-item>
    <weather-item city="Lugano"></weather-item>
   
    <hr>

    <v-btn elevation="6" large class="pink accent-2" @click=" goNewYork">New York</v-btn>
    

  </div>
</template>

<script>
import WeatherItem from "@/components/WeatherItem";
import { mapFields } from "vuex-map-fields";

export default {
  name: "search",
  components: {
    WeatherItem,
  },
  data() {
    return {
      forecast: {},
    };
  },
  computed: {
    ...mapFields(["city"]),
    forecastTemperature() {
      return this.forecast.main.temp + " Grad Celcius";
    },
    backgroundCheck() {
      if (this.forecast.main && this.forecast.main.temp > 16) {
        return true;
      } else {
        return false;
      }
    },
  },
  city() {
    return this.$store.getters.currentCity;
  },
  methods: {
         fetchWeather() {
          this.$store.dispatch('fetchWeather', this.city).then(response => {
            this.forecast = response
          })
    },
    goNewYork() {
      this.$router.push({name: 'City', params: {
        city: 'New York'
      }})
    }
  },
};
</script>

<style lang="scss" scoped>
.about {
  height: 100vh;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 1.8rem;
  text-shadow: 1px 1px 4px #333, 1px 1px 4px #fff;
  background: url("../assets/sundown.jpg"), radial-gradient(#ccc, #333);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: multiply;
}

</style>
