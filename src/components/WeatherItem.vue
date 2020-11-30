<template>
  <div class="cities">
    <p>{{ city }}: {{ forecastTemperature }}</p>
    <p>{{ showInfos.description }}</p>
    <div class="image">
      <img v-bind:src="require('../assets/' + showInfos.icon + '.png')" />
    </div>
    
    <p>Windgeschwindigkeit: {{ surfInfos.speed }} Knoten</p>
    <p>{{ surfInfos.deg }}</p>
    <br />
   
  </div>
</template>

<script>

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
        return `${Math.round(this.forecast.main.temp)}°C`;
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
    }
  },
  mounted: function () {
    this.fetchWeather()
  },
  methods: {
      fetchWeather() {
          this.$store.dispatch('fetchWeather', this.city).then(response => {
            this.forecast = response
          })
        }
  },
};
</script>
<style lang="scss" scoped>
.cities {
  background-color: rgba(#ffffff, .2);
  width: 80%;
  margin: 12px auto;
  padding: 12px;
  border-radius: 16px;
}
.image {
  width: 200px;
  margin: auto;
  border-radius: 16px;
  background: radial-gradient(rgba(255, 255, 230, .5),rgba(191, 255, 128, .5));
}
</style>