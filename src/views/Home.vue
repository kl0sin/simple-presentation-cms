<template>
  <div class="home">
    <no-presentation-active v-if="!isPresentation"/>

    <div v-if="isPresentation" class="home__presentation presentation">
      <h2>
        {{ activePresentationData.presentationName}}
      </h2>
      <div class="presentation__description">
        {{ activePresentationData.presentationDescription }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import noPresentationActive from '../components/NoPresentationActive';
export default {
  name: 'home',
  data() {
    return {
      isPresentation: Boolean
    };
  },
  components: { noPresentationActive },
  computed: {
    ...mapGetters(['activePresentationData'])
  },
  mounted() {
    this.getPresentationData();
  },
  watch: {
    activePresentationData() {
      this.updatePresentationData();
    }
  },
  methods: {
    getPresentationData() {
      this.activePresentationData.presentationData
        ? (this.isPresentation = true)
        : (this.isPresentation = false);
    },
    updatePresentationData() {
      this.activePresentationData.presentationData
        ? (this.isPresentation = true)
        : (this.isPresentation = false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/home';
</style>
