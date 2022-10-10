<template>
  <div v-if="show_login">
    <LoginScreen />
  </div>
  <div v-if="show_messcodes">
    <MessCodeScreen />
  </div>

  <h2>meh {{ LOGIN }}</h2>

  <span @click="logout()">LOGOUT</span>
</template>

<script>
import LoginScreen from "./components/LoginScreen.vue";
import MessCodeScreen from "@/components/MessCodeScreen.vue";
import { isLoggedIn, issueLogout, subscribeToLoggedIn } from "@/props";

export default {
  name: "App",
  components: { LoginScreen, MessCodeScreen },
  data() {
    return {
      show_login: false,
      show_messcodes: false,
      LOGIN: null,
    };
  },
  methods: {
    logout() {
      issueLogout();
    },
  },
  mounted() {
    if (isLoggedIn()) {
      this.show_messcodes = true;
    } else {
      this.show_login = true;
      issueLogout();
    }
    subscribeToLoggedIn((e) => {
      if (e.loggedIn === true) {
        this.show_login = false;
        this.show_messcodes = true;
      } else {
        this.show_login = true;
        this.show_messcodes = false;
      }
    });
  },
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
