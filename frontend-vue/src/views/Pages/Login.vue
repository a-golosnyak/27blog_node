<template>
  <h2>Login Page</h2>
  <div class="wrapper">
    <div class="item">
      <span> Email </span>
      <input name="login" class="ml-2" v-model="email" />
    </div>
    <div class="item">
      <span> Password </span>
      <input name="password" class="ml-1" v-model="password" type="password" />
    </div>
    <div class="button-wrapper">
      <button @click="onLogin">Login</button>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    onLogin() {
      window.axios
        .post("/api/login", {
          email: this.email,
          password: this.password,
        })
        .then(({ data }) => {
          console.log("Login successful ", data);
        })
        .catch(({ response }) => {
          console.log("Login failed ", response);
        });
    },
  },
};
</script>

<style scoped>
.wrapper {
  /*width: 50%;*/
}

.ml-1 {
  margin-left: 17px;
}
.ml-2 {
  margin-left: 3rem;
}
.button-wrapper {
  margin-top: 1rem;
  margin-left: 12rem;
}
</style>
