<template>
  <div class="modal">
    <div class="modal__content">
      {{ removeMessage }}
      <footer class="modal__buttons">
        <button class="btn btn--remove"
                @click="cancel()">
          <i class="fas fa-plus-circle"></i>
          <span>Cancel</span>
        </button>
        <button class="btn btn--add"
              @click="removePresentation()">
          <i class="far fa-trash-alt"></i>
          <span>Remove presentation</span>
        </button>

      </footer>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
export default {
  name: 'RemovePresentationModal',
  data() {
    return {
      removeMessage: 'Are you sure that you want to delete this presentation?'
    };
  },
  computed: {
    ...mapGetters(['removePresentationKey'])
  },
  methods: {
    cancel() {
      this.$store.dispatch('closeRemovePresentationModal')
    },
    removePresentation() {
      this.$store.dispatch('removePresentation', this.removePresentationKey).then(() => {
        this.$store.dispatch('closeRemovePresentationModal');
      })
    }
  }
};
</script>

<style scoped lang="scss">
@import '../assets/styles/modal';
@import '../assets/styles/buttons';
</style>
