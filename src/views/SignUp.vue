<template>
  <div class="form">
    <h1 class="form__info">Sign up</h1>
    <form class="form__container"
        v-on:submit.prevent="signUp()">
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
      <span class="form__label">Confirm password</span>
      <input
        :class="['form__input', { 'form__input--invalid' : passwordInvalid }]"
        v-model="rePassword"
        type="password"
        placeholder="Confirm password">
      <button type="submit">Sign Up</button>
    </form>
    <span class="form__bottom-text">Already have an account? <router-link to="/sign-in">Login</router-link></span>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      rePassword: '',
      passwordInvalid: false,
      emailInvalid: false,
      passwordErrorMessage: '',
      emailErrorMessage: ''
    };
  },
  methods: {
    signUp() {
      this.emailInvalid = false;
      this.passwordInvalid = false;
      if (this.password === this.rePassword) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .catch(error => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
              this.emailInvalid = true;
              this.emailErrorMessage = 'This email is already in use.';
            } else if (errorCode === 'auth/invalid-email') {
              this.emailInvalid = true;
              this.emailErrorMessage = 'Invalid email';
            } else if (errorCode === 'auth/operation-not-allowed') {
              this.passwordInvalid = true;
              this.emailInvalid = true;
              this.emailErrorMessage = 'Operation not allowed.';
            } else if (errorCode === 'auth/weak-password') {
              this.passwordInvalid = true;
              this.passwordErrorMessage = 'Your password is to weak!';
            }
          });
      } else {
        this.passwordInvalid = true;
        this.passwordErrorMessage = 'Passwords must be the same';
      }
    },
    emailWasChanged() {
      this.emailInvalid ? this.emailInvalid = false : '';
    },
    passwordWasChanged() {
      this.passwordInvalid ? this.passwordInvalid = false : '';
    }
  }
};
</script>

<style scoped lang="scss">
@import '../assets/styles/form';
</style>
