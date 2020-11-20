<template>
  <div class="about" v-bind:class="{ warm: backgroundCheck }">
    <h2>Surf Info</h2>

    <input
      type="text"
      class="search__bar"
      placeholder="Search..."
      v-model="city"
      @keypress="fetchWeather"
    />
    <br />
    <p v-if="forecast.main">
      {{ forecastTemperature }}
    </p>
    <p v-if="forecast.weather">
      {{ forecastDescription}}
    </p>
    <p v-if="forecast.wind">
      {{ forecastWind}}
    </p>
    <div v-if="forecast.weather">
      <img v-bind:src="require('../assets/' + forecastIcon + '.png')" alt="">
      
    </div>

  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  name: "Search",
  components: {},
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
    forecastDescription() {
      return "Es ist " + this.forecast.weather[0].description;
    },
    forecastWind() {
      return "Windgeschwindigkeit beträgt " + this.forecast.wind.speed + " Knoten";
    },
    forecastIcon() {
      return this.forecast.weather[0].icon;
    },
    apiUrl() {
      return (
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        this.city +
        "&units=metric&lang=de&appid=" +
        process.env.VUE_APP_WEATHER_KEY
      );
    },
    backgroundCheck() {
      if (this.forecast.main && this.forecast.main.temp > 16) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
         fetchWeather() {
          this.$store.dispatch('fetchWeather', this.city).then(response => {
            this.forecast = response
          })
    },
  },
};
</script>

<style lang="scss" scoped>
.about {
  height: 100vh;
  width: 100%;
  height: 100vh;
  color: white;
  font-size: 1.8rem;
  text-shadow: 1px 1px 4px #333, 1px 1px 4px #fff;
  background: url("../assets/main_bg.jpg"), radial-gradient(#ccc, #333);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: multiply;
}
.about.warm {
  background: url("../assets/warm_bg.jpg"), radial-gradient(#ccffff, #00ffff);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
