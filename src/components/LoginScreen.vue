<template>
  <form @submit.prevent="log(email, password)">
    <h2>Log in</h2>
    <sub>
      Logging in to
      <code> {{ apiURL }} </code>
    </sub>
    <h4 v-if="errMsg">{{ errMsg }}</h4>
    <input
      type="text"
      name="uname"
      v-model="email"
      placeholder="enrollment number / email"
      required
    />
    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="Password"
      required
    />
    <button
      type="submit"
      class="registerbtn"
      name="submit"
      :disabled="isLoggingIn"
    >
      Log In
      <img src="../assets/reload.svg" class="spin" v-show="isLoggingIn" />
    </button>
    <button disabled>Sign in with Microsoft (coming soon)</button>

    <span> uhm {{ data }} </span>
  </form>
</template>
<script>
import { login } from "@/api-methods";
import { issueLogin } from "@/props";
export default {
  name: "LoginScreen",
  data() {
    return {
      apiURL: process.env.VUE_APP_API_URL,
      proxy: process.env.VUE_APP_USING_PROXY,
      email: "",
      password: "",
      data: null,
      loggedIn: null,
      errMsg: null,
      isLoggingIn: false,
    };
  },
  methods: {
    log(u, p) {
      this.isLoggingIn = true;
      this.errMsg = null;
      login(u, p)
        .then((res) => {
          console.log(res);

          this.data = res;
          if (res.res.message === "MISMATCH") {
            this.errMsg = "The id and the password do not match";
          } else if (res.res.message === "UNREG-REGISTRATION_ID") {
            this.errMsg = "The id you have entered does not exist";
          } else if (res.res.message === "SUCCESS") {
            issueLogin(res.res.token);
          }
        })
        .then(() => (this.isLoggingIn = false));
    },
  },
  // mounted() {
  //   subscribeToLoggedIn(this);
  // },
};
</script>

<style>
form {
  position: relative;
  z-index: 1;
  max-width: 360px;
  margin: 0 auto 50px;
  padding: 45px;
  text-align: center;
  border: 0.2rem solid #fff;
  border-radius: 2rem;
  box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe,
    0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe;
}
input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #000000;
  color: white;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;

  border: 0.2rem solid #fff;
  border-radius: 2rem;
  box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe,
    0 0 0.3rem #bc13fe, 0 0 0.3rem #bc13fe, inset 0 0 0.3rem #bc13fe;
}

button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4d0868;
  width: 100%;
  border: 0.2rem solid #fff;
  border-radius: 2rem;
  box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe,
    0 0 0.3rem #bc13fe, 0 0 0.3rem #bc13fe, inset 0 0 0.3rem #bc13fe;
  padding: 15px;
  margin-bottom: 0.8rem;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
}
body {
  background-color: #000000;
}
sub,
span {
  display: block;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;

  color: #fff;
}

h2 {
  color: #fff;
  text-shadow: 0 0 2px #fff, 0 0 2px #fff, 0 0 2px #fff, 0 0 2px #0fa,
    0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;

  font-size: 2rem;
}
@keyframes spinner {
  from {
    rotate: 0deg;
  }

  to {
    rotate: -360deg;
  }
}

.spin {
  animation-duration: 1.5s;
  animation-timing-function: linear;
  animation-name: spinner;
  animation-iteration-count: infinite;
}
.registerbtn {
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
