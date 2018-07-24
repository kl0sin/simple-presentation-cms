<template>
  <aside class="avaiable-presentations">
    <h3>Avaiable presentations</h3>
    <ul class="avaiable-presentations__presentation presentation">
      <presentation-card v-for="presentation in presentationsData"
                         :presentation="presentation"/>
    </ul>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import PresentationCard from './PresentationCard';
export default {
  name: 'AvaiablePresentations',
  data() {
    return {
      presentationsData: {}
    };
  },
  computed: {
    ...mapGetters(['presentations'])
  },
  watch: {
    presentations(nData) {
      this.updatePresentations(nData);
    }
  },
  created() {
    this.getPresentations();
  },
  components: {
    PresentationCard
  },
  methods: {
    getPresentations() {
      if (this.presentationsData) {
        this.$store.dispatch('getPresentations');
      }
    },
    updatePresentations(data) {
      this.presentationsData = data;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/aside';
</style>
