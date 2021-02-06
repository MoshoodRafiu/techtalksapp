<template>
  <div id="app">
    <chat-box v-if="false"/>
    <home/>
  </div>
</template>

<script>
import ChatBox from './components/ChatBox.vue';
import Home from './components/Home.vue';

export default {
  name: 'App',
  components: {
    ChatBox,
    Home
  }
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  width: 100%;
  background: #fff;
  padding: 0;
  margin: 0;
}
</style>
