<template>
  <div class="code-snippets">
    <div v-for="category in snippetsData">
      <h2> {{ category.categoryName }}</h2>
      <snippet v-for="snippet in category.snippets" :snippet="snippet"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Snippet from '../components/Snippet';

  export default {
    name: 'CodeSnippets',
    data() {
      return {
        snippetsData: {},
        collapsed: false
      };
    },
    computed: {
      ...mapGetters(['activePresentationData'])
    },
    watch: {
      activePresentationData() {
        this.updateSnippetsData();
      }
    },
    components: {
      Snippet
    },
    created() {
      this.updateSnippetsData();
    },
    methods: {
      updateSnippetsData() {
        const snippetData = this.activePresentationData.presentationData;
        if (snippetData) {
          this.snippetsData = snippetData.codeCategories;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../assets/styles/code-snippets';
</style>
