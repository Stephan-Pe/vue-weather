<template>
  <div class="about" v-bind:class="{ warm: backgroundCheck }">
    <h2>Surf Info</h2>

    <input
      type="text"
      class="search__bar"
      placeholder="Search..."
      v-model="city"
      v-on:keyup.enter="fetchWeather"
    />
    <br />
    <p v-if="forecast.main">
      {{ forecastTemperature}}
    </p>
    <p v-if="forecast.weather">
      {{ forecastDescription }}
    </p>
    <p v-if="forecast.wind">
      {{ forecastWind }}
    </p>
    <p v-if="forecast.wind">
      {{ windDir }}
    </p>
    <div class="weather__image" v-if="forecast.weather">
      <img v-bind:src="require('../assets/' + forecastIcon + '.png')" alt="" />
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
      return `${Math.round(this.forecast.main.temp )} °C`;
    },
    forecastDescription() {
      return this.forecast.weather[0].description;
    },
    forecastWind() {
      return (
        "Windgeschwindigkeit beträgt " + this.forecast.wind.speed + " Knoten"
      );
    },
    forecastIcon() {
      return this.forecast.weather[0].icon;
    },
    windDir() {
      let degree = this.forecast.wind.deg;
      if (degree > 337.5) return "Wind aus Richtung Nord";
      if (degree > 292.5) return "Wind aus Richtung Nord West";
      if (degree > 247.5) return "Wind aus Richtung West";
      if (degree > 202.5) return "Wind aus Richtung Süd West";
      if (degree > 157.5) return "Wind aus Richtung Süd";
      if (degree > 122.5) return "Wind aus Richtung Süd Ost";
      if (degree > 67.5) return "Wind aus Richtung Ost";
      if (degree > 22.5) {
        return "Wind aus Richtung Nord Ost";
      }
      return "Meist schwacher Wind ohne bestimmbare Windrichtung";
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
      this.$store.dispatch("fetchWeather", this.city).then((response) => {
        this.forecast = response;
      });
    },
  },
  
};

</script>

<style lang="scss" scoped>
.about {
  height: 100%;
  width: 80%;
  margin: auto;
  border-radius: 16px;
  padding: 24px;
  min-height: 45vh;
  color: white;
  font-size: 1.8rem;
  text-shadow: 1px 1px 4px #333, 1px 1px 4px #fff;
  background: url("../assets/snowboard.jpg"), radial-gradient(#ccc, #333);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: multiply;
}
.about.warm {
  background: url("../assets/beach.jpg"), radial-gradient(#fff3cc, #b4b223);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.weather__image {
  background-color: rgba(#00ff6e, 0.5);
  width: 160px;
  border-radius: 12px;
  margin: auto;
}
</style>
