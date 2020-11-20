<template>
  <div
    class="weather spacing"
    :class="
      typeof weather.main != 'undefined' && weather.main.temp > 17
        ? 'warm'
        : 'cold'
    "
  >
    <h1>{{ mainTitle }}</h1>
    <input
      type="text"
      class="search__bar"
      placeholder="Search..."
      v-model="query"
      @keypress="fetchWeather"
    />
    <br />
    <div class="weather__container" v-if="typeof weather.main != 'undefined'">
      <div class="weather__location">
        {{ weather.name }}, {{ weather.sys.country }}
      </div>
      <div class="weather__date">{{ dateApp() }}</div>
      <div class="weather__values">
        <div class="weather__temp">{{ Math.round(weather.main.temp) }}°C</div>
        <div class="weather__cond">{{ weather.weather[0].description }}</div>
        <div class="weather__icon">
          <img
            v-bind:src="
              require('../assets/' + weather.weather[0].icon + '.png')
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Weather",
  components: {},
  data() {
    return {
      mainTitle: "Wetter App",
      api_key: "6b9d9bb55f16b29fd2d357b3050906bc",
      base_url: "https://api.openweathermap.org/data/2.5/",
      city: "",
      query: "",
      weather: {},
    };
  },
  methods: {
    fetchWeather(e) {
      if (e.key === "Enter") {
        fetch(
          `${this.base_url}weather?q=${this.query}&units=metric&lang=de&APPID=${this.api_key}`
        )
          .then((res) => {
            return res.json();
          })
          .then(this.setResults);
      }
    },
    setResults(results) {
      this.weather = results;
    },
    dateApp() {
      let d = new Date();
      let months = [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "July",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
      ];
      let days = [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Sonnabend",
      ];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.spacing > * + * {
  margin-top: var(--spacer, 1.2rem);
}
.weather {
  width: 100%;
  height: 100vh;
  color: white;
  font-size: 1.8rem;
  text-shadow: 1px 1px 4px #333, 1px 1px 4px #fff;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: multiply;
}
.weather.warm {
  background: url("../assets/warm_bg.jpg"), radial-gradient(#ccffff, #00ffff);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.weather.cold {
  background: url("../assets/cold_bg.jpg"), radial-gradient(#ccc, #333);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.weather__icon {
  width: 150px;
  margin: auto;
  background-color: rgba(white, 0.7);
  img {
    width: 100%;
  }
}
</style>