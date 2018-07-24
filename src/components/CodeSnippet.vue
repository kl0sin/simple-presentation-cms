<template>
  <div class="card">
    <div :class="['card__tab', { 'card__tab--active' : isActive }]"
         @click="toggleActive()">
      {{ snippet.fileName }}
    </div>
    <button class="btn btn--remove"
            @click="removeItem(snippetIndex, categoryIndex)">
      <i class="fas fa-minus-circle"></i>
      <span>Remove</span>
    </button>
    <div :class="['card__content', { 'card__content--active' : isActive }]">
      <div class="card__item item">
        <span>File Name</span>
        <span class="item__label"
              v-if="!isEdit"
              v-text="snippetData.fileName"></span>
        <input v-else type="text"
               v-model="snippetData.fileName">
      </div>
      <div class="card__item">
        <span>File Type</span>
        <span class="item__label"
              v-if="!isEdit"
              v-text="snippetData.fileType"></span>
        <input v-else type="text"
               v-model="snippetData.fileType">
      </div>
      <div class="card__item">
        <span>More Info</span>
        <span class="item__label"
              v-if="!isEdit"
              v-text="snippetData.moreInfo"></span>
        <input v-else type="text"
               v-model="snippetData.moreInfo">
      </div>
      <div class="card__item">
        <span>Description</span>
        <span class="item__label"
              v-if="!isEdit"
              v-text="snippetData.description"></span>
        <input v-else type="text"
               v-model="snippetData.description">
      </div>
      <div class="card__item">
        <span>Code</span>
        <span class="item__label"
              v-if="!isEdit"
              v-text="snippetData.code"></span>
        <input v-else type="text"
               v-model="snippetData.code">
      </div>
      <footer class="card__footer">
        <button v-if="!isEdit"
                class="btn btn--add"
                @click="toggleEdit()">
          <i class="fas fa-edit"></i>
          <span>Edit</span>
        </button>
        <button v-if="isEdit"
                class="btn btn--remove"
                @click="toggleEdit()">
          <i class="fas fa-ban"></i>
          <span>Cancel</span>
        </button>
        <button v-if="isEdit"
                class="btn btn--add"
                @click="saveSnippetData(categoryIndex, snippetIndex)">
          <i class="far fa-save"></i>
          <span>Save</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'codeSnippetsPanel',
    data() {
      return {
        isActive: false,
        isEdit: false,
        snippetData: {
          fileName: '',
          fileType: '',
          moreInfo: '',
          description: '',
          code: '',
        },
      }
    },
    props: {
      snippet: Object,
      snippetIndex: Number,
      categoryIndex: Number
    },
    computed: {
      ...mapGetters([ 'editPresentationData' ]),
    },
    created() {
      this.getSnippetData();
    },
    watch: {
      snippetData(data) {
        this.snippetData = data;
      }
    },
    methods: {
      toggleActive() {
        this.isActive ? this.isActive = false : this.isActive = true;
      },
      removeItem(snippetIndex, categoryIndex) {
        this.$store.dispatch('removeCodeSnippet', { snippetIndex: snippetIndex, categoryIndex: categoryIndex });
      },
      toggleEdit() {
        this.isEdit ? this.isEdit = false : this.isEdit = true;
      },
      getSnippetData() {
        this.snippetData = JSON.parse(JSON.stringify(this.snippet));
      },
      updateSnippetData(categoryIndex, snippetIndex) {
        let updatedData = this.$store.getters.editPresentationData.presentationData.codeCategories[categoryIndex].snippets[snippetIndex];
        this.snippet.fileName = updatedData.fileName;
      },
      saveSnippetData(categoryIndex, snippetIndex) {
        this.$store.dispatch('updateSnippetData', { snippetIndex: snippetIndex, categoryIndex: categoryIndex, snippet: this.snippetData });
        this.updateSnippetData(categoryIndex, snippetIndex);
        this.isActive = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/tabs';
  @import '../assets/styles/buttons';
</style>
