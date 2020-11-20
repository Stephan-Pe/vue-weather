<template>
  <div class="cities">
    <p>{{ city }}: {{ forecastTemperature }}</p>
    <p>{{ showInfos.description }}</p>
    <img v-bind:src="require('../assets/' + showInfos.icon + '.png')" />
    <p>Windgeschwindigkeit: {{ surfInfos.speed }} Knoten</p>
    <p>{{ surfInfos.deg }}</p>
    <br />
    <button @click="this.$emit(event, 'testEvent')">Test</button>
    <hr>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Weather",
  data() {
    return {
      forecast: {},
    };
  },
  props: ["city"],
  computed: {
    forecastTemperature() {
      if (this.forecast.main) {
        return this.forecast.main.temp + " Grad Celcius";
      } else {
        return "unbekannt";
      }
    },
    showInfos() {
      let { description, icon } = this.forecast.weather[0];
      if (this.forecast.weather) {
        return { description, icon };
      } else {
        return "unknown";
      }
    },
    surfInfos() {
      let { speed } = this.forecast.wind;
      if (this.forecast.wind) {
        return { speed };
      } else {
        return "unknown";
      }
    },
    apiUrl() {
      return (
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        this.city +
        "&units=metric&lang=de&appid=" +
        process.env.VUE_APP_WEATHER_KEY
      );
    },
  },
  mounted: function () {
    this.fetchWeather()
  },
  methods: {
    fetchWeather() {
      let self = this;
      axios
        .get(this.apiUrl)
        .then(function (response) {
          // handle success
          self.forecast = response.data;
          console.log(self.forecast.wind.deg);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  },
};
</script>