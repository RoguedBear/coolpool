<template>
  <MenuItem json-menu="{}" />
</template>

<script>
import MenuItem from "./components/MenuItem.vue";
export default {
  name: "App",
  components: { MenuItem },
};
</script>

<style>
#app {
  font-family: Oxygen, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@font-face {
  font-family: "Oxygen";
  src: local("Oxygen"), url("./assets/fonts/Oxygen.ttf") format("truetype");
}
</style>
