<template>
  <div id="app">
    <navigation :presentation="presentationData"/>
    <router-view/>
    <transition name="transition transition--fade">
      <loader v-if="isLoader"/>
    </transition>
  </div>
</template>

<script>
import Navigation from './components/Navigation';
import Loader from './components/Loader';
import { mapGetters } from 'vuex';

export default {
  components: { Navigation, Loader },
  data() {
    return {
      presentationData: {}
    };
  },
  watch: {
    activePresentationData(nData) {
      this.updatePresentationData(nData);
    }
  },
  created() {
    this.getPresentationData();
  },
  computed: {
    ...mapGetters(['activePresentationData', 'isLoader'])
  },
  methods: {
    getPresentationData() {
      this.$store.dispatch('activePageLoader').then(() => {
        this.$store.dispatch('getPresentationData').then(() => {
          this.presentationData = this.activePresentationData;
        });
      });
    },
    updatePresentationData(data) {
      this.presentationData = data;
    }
  }
};
</script>

<style lang="scss">
@import 'assets/styles/highlight';
@import 'assets/styles/reset';
@import 'assets/styles/app';
@import 'assets/styles/transition';
</style>
