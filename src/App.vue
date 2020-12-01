<template>
   <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
       <img
            v-bind:src="
              require('./assets/wind-rose.png')
            "
          />
    </div>
    <router-view/>
  </div>
</template>
<script>

export default {
  data: function () {
    return {
      imageLink: {
        logo: "/assets/logo.png",
      },
    };
  },
  computed: {
 
  },
};
</script>

<style lang="scss">
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

#nav {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding-left: 40px;
  justify-content: space-between;
  a {
    font-size: 1.8rem;
    text-decoration: none;
  }
  img {
    height: 100%;
    margin-right: 40px;
  }
}
</style>
