<template>
<div class="home">
 <Weather />
</div>
</template>

<script>
// @ is an alias to /src
import Weather from '../components/WeatherApp';

export default {
 name: 'home',
 components: {
   Weather
 }
};
</script>

<style lang="scss" scoped>

</style>
