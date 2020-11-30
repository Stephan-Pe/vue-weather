<template>
  <div>
        So ist das Wetter in -
        {{forecastCity}}: {{forecastTemperature}}
    </div>
</template>

<script>
import { mapGetters} from 'vuex';
export default {
  name: "Weather",
  data() {
    return {
   
    };
  },
  computed: {
          forecast() {
          return this.$store.state.forecast
        },
    ...mapGetters({
      forecast: "currentForecast"
    }),
    forecastTemperature() {
      if (this.forecast.main) {
        return `${Math.round(this.forecast.main.temp)}°C`;
      } else {
        return "unbekannt";
      }
    },
           forecastCity () {
          if (this.forecast.name) {
            return this.forecast.name
          } else {
            return 'unbekannt'
          }
        }
  },
  mounted: function () {
   
  },
  methods: {
  
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
</style>