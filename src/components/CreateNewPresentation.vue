<template>
  <div class="presentation presentation--new">
    <h2>
      {{ message }}
    </h2>
    <i class="far fa-grin-alt"></i>
    <button class="presentation__submit presentation__submit--create"
            @click="createNewPresentation">CREATE NEW PRESENTATION</button>
  </div>
</template>

<script>
import { newPresentationTemplate } from '../assets/templates/newItemTemplate';
export default {
  name: 'CreateNewPresentation',
  data() {
    return {
      message: 'Create new or edit exist presentation'
    };
  },
  methods: {
    createNewPresentation() {
      this.$store.dispatch('createNewPresentation', newPresentationTemplate);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../assets/styles/presentationPanel';
@import '../assets/styles/buttons';
</style>
