import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// Import the `getField` getter and the `updateField`
// mutation function from the `vuex-map-fields` module.
import { getField, updateField } from 'vuex-map-fields';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: 'Chur',
    forecast: {}
  },
  getters: {
    // Add the `getField` getter to the
    // `getters` of your Vuex store instance.
    getField,
    currentCity: state => {
      return state.city
    },
    currentForecast: state => {
      // destructuring here
      return state.forecast
    },
    backgroundImage: state => {
      if (state.forecast.main && state.forecast.main.temp > 12) {
        return 'warm';
      } else {
        return 'cold';
      }
    }
  },
  mutations: {
    // Add the `updateField` mutation to the
    // `mutations` of your Vuex store instance.
    updateField,
    setCity (state, payLoad) { state.city = payLoad; },
    setForecast(state, payload) {
      state.forecast = payload
    }
 
  },
  actions: {
    fetchWeather(state, payLoad) {
      return axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + payLoad + '&units=metric&lang=de&appid=' + process.env.VUE_APP_WEATHER_KEY)
        .then(function (response) {
          // handle success
          localStorage.setItem('store', JSON.stringify(response.data))
          return response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    },
    fetchWeatherForStore({commit},payLoad) {
      return axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + payLoad + '&units=metric&lang=de&appid=' + process.env.VUE_APP_WEATHER_KEY)
        .then(function (response) {
          // handle success
          if (response.data.main) {
            commit('setForecast', response.data)
          return response.data
          } else {
            throw new Error
          }
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          return error
        })
    },
  }
 
})
