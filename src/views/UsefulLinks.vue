<template>
  <div class="useful-links">
    <div v-for="category in linksData">
      <h2 class="useful-links__label">{{ category.categoryName }}</h2>
      <ul class="useful-links__list list">
        <li v-for="(link, index) in category.links" :key="'information_' + index" class="list__item">
          <span class="list__item__label">{{ link.linkName }}</span>
          <a :href="link.linkUrl"
             v-text="link.displayUrl"
             target="_blank">
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'usefulLinks',
    data() {
      return {
        linksData: {}
      }
    },
    computed: {
      ...mapGetters(['activePresentationData'])
    },
    created() {
      this.updateLinkData();
    },
    watch: {
      activePresentationData() {
        this.updateLinkData();
      },
    },
    methods: {
      updateLinkData() {
        const presentationData = this.activePresentationData.presentationData;
        if (presentationData) {
          this.linksData = presentationData.linkCategories;
        }
      }
    },
  }
</script>

<style scoped lang="scss">
@import '../assets/styles/usefulLinks';
</style>
