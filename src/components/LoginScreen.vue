<template>
  <h2>Log in</h2>
  <sub>
    Logging in to
    <code> {{ apiURL }} </code>
  </sub>

  <h4 v-if="errMsg">{{ errMsg }}</h4>
  <form @submit.prevent="log(email, password)">
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
    <button type="submit" class="registerbtn" name="submit">Log In</button>
    <hr />
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
    };
  },
  methods: {
    log(u, p) {
      this.errMsg = null;
      login(u, p).then((res) => {
        console.log(res);
        this.data = res;
        if (res.res.message === "MISMATCH") {
          this.errMsg = "The id and the password do not match";
        } else if (res.res.message === "UNREG-REGISTRATION_ID") {
          this.errMsg = "The id you have entered does not exist";
        } else if (res.res.message === "SUCCESS") {
          issueLogin(res.res.token);
        }
      });
    },
  },
  // mounted() {
  //   subscribeToLoggedIn(this);
  // },
};
</script>

<style>
form {
  display: grid;
}
</style>
