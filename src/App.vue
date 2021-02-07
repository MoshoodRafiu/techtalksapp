<template>
  <div id="app">
    <app-navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
export default {
  components: {
    AppNavbar: Navbar
  }
}
</script>


<style>
  input:focus{
    outline: none;
  }
</style>
