<template>
  <li class="presentation-card card">
    <span class="card__name"
          @click="toggleActive()">
      {{ presentation.presentationName }}
    </span>
    <div class="card__description">
      {{ presentation.presentationDescription }}
    </div>
    <footer class="card__footer">
      <button class="btn btn--active"
              @click="activePresentation(presentation)">
        <i class="far fa-check-circle"></i>
        <span>Active</span>
      </button>
      <button class="btn btn--add"
              @click="editPresentation(presentation)">
        <i class="fas fa-pencil-alt"></i>
        <span>Edit</span>
      </button>
      <button class="btn btn--remove"
              @click="removePresentation()">
        <i class="fas fa-pencil-alt"></i>
        <span>Remove</span>
      </button>
    </footer>
  </li>
</template>

<script>
export default {
  name: 'presentationCard',
  data() {
    return {
      isActive: false
    };
  },
  props: {
    presentation: Object
  },
  methods: {
    activePresentation(presentation) {
      this.$store.dispatch('activePresentation', presentation);
    },
    editPresentation(presentation) {
      this.$store.dispatch('editPresentation', presentation);
    },
    removePresentation() {
      this.$store.dispatch('openRemovePresentationModal', this.presentation.key);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../assets/styles/presentationCard';
@import '../assets/styles/buttons';
</style>
