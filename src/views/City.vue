<template>
  <div class="about" v-bind:class="{ warm: backgroundCheck }">
    
    <weather-store ></weather-store>
   
    <br />
    
 
  </div>
</template>

<script>
import WeatherStore from "@/components/WeatherStore";
import { mapGetters } from "vuex";

export default {
  name: "city",
  components: {
    WeatherStore,
  },
  data() {
    return {
    
    };
  },
  computed: {
    backgroundCheck() {
      if (this.forecast.main && this.forecast.main.temp > 16) {
        return true;
      } else {
        return false;
      }
    },
        ...mapGetters({
        forecast: "currentForecast"
      }),
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 1.8rem;
  text-shadow: 1px 1px 4px #333, 1px 1px 4px #fff;
  //background: url("../assets/sundown.jpg"), radial-gradient(#ccc, #333);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: multiply;
}

</style>
