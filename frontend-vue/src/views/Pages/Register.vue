<template>
  <h2>Register Page</h2>
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
      <button @click="onRegister">Register</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    onRegister() {
      window.axios
        .post("/register", {
          email: this.email,
          password: this.password,
        })
        .then(({ data }) => {
          console.log("Register response successful ", data);
        })
        .catch(({ response }) => {
          console.log("Register request failed ", response);
        });
    },
  },
};
</script>

<style scoped>
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
