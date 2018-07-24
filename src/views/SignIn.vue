<template>
  <div class="form">
    <h1 class="form__info">Sign in</h1>
    <form class="form__container"
        v-on:submit.prevent="signIn()">
      <span class="form__label">E-mail</span>
      <input
        :class="['form__input', { 'form__input--invalid' : emailInvalid }]"
        v-model="email"
        type="text"
        placeholder="E-mail">
      <span class="form__error" v-if="emailInvalid">{{ emailErrorMessage }}</span>
      <span class="form__label">Password</span>
      <input
        :class="['form__input', { 'form__input--invalid' : passwordInvalid }]"
        v-model="password"
        type="password"
        placeholder="Password">
      <span class="form__error" v-if="passwordInvalid">{{ passwordErrorMessage }}</span>
      <button type="submit">Sign In</button>
    </form>
    <span class="form__bottom-text">Don't have account? <router-link to="/sign-up">Create</router-link></span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
      emailInvalid: false,
      passwordInvalid: false,
      passwordErrorMessage: '',
      emailErrorMessage: ''
    };
  },
  computed: {
    ...mapGetters([
      'signInData',
      'user',
    ])
  },
  watch: {
    user(data) {
      if (data !== null && data !== undefined) {
        this.$router.replace('/panel');
      }
    },
  },
  methods: {
    signIn() {
      this.$store.dispatch('signInUser', {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import '../assets/styles/form';
</style>
