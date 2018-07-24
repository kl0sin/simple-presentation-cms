<template>
  <div class="category" >
    <div v-if="!isEdit"
         :class="['category__tab', { 'category__tab--active' : isActive}]"
         @click="toggleActive()">
      {{ category.categoryName }}
    </div>
    <div class="card__item item"
         v-if="isEdit">
      <input v-model="categoryName"
             type="text">
    </div>
    <button v-if="isActive"
            class="btn btn--add"
            @click="addNewSnippet(categoryIndex)">
      <i class="fas fa-plus-circle"></i>
      <span>Add new</span>
    </button>
    <button v-if="!isEdit"
            class="btn btn--add"
            @click="startEdit(categoryIndex)">
      <i class="fas fa-pencil-alt"></i>
      <span>Rename</span>
    </button>
    <button v-if="isEdit"
            class="btn btn--add"
            @click="renameCategory(categoryIndex)">
      <i class="fas fa-pencil-alt"></i>
      <span>Rename</span>
    </button>
    <button v-if="isEdit"
            class="btn btn--remove"
            @click="abandonEdit()">
      <i class="fas fa-pencil-alt"></i>
      <span>Cancel</span>
    </button>
    <button v-if="!isEdit"
            class="btn btn--remove"
            @click="removeCategory(categoryIndex)">
      <i class="fas fa-minus-circle"></i>
      <span>Remove</span>
    </button>
    <div :class="['category__container', { 'category__container--active': isActive }]">
      <snippet v-for="(snippet, index) in category.snippets"
               :snippet="snippet"
               :snippetIndex="index"
               :categoryIndex="categoryIndex"
               :key="'snippet_' + index"/>
    </div>
  </div>
</template>

<script>
import snippet from './CodeSnippet';
import { codeSnippetTemplate } from '../assets/templates/newItemTemplate';
export default {
  name: 'codeCategory',
  data() {
    return {
      isActive: false,
      isEdit: false,
      categoryName: ''
    };
  },
  props: {
    category: Object,
    categoryIndex: Number
  },
  components: {
    snippet
  },
  methods: {
    toggleActive() {
      this.isActive ? (this.isActive = false) : (this.isActive = true);
    },
    addNewSnippet(index) {
      this.$store.dispatch('addCodeSnippet', {
        codeSnippetTemplate: codeSnippetTemplate,
        categoryIndex: index
      });
    },
    renameCategory(categoryIndex) {
      this.$store
        .dispatch('renameCodeCategory', {
          categoryIndex: categoryIndex,
          categoryName: this.categoryName
        })
        .then(() => {
          this.isEdit = false;
        });
    },
    removeCategory(data) {
      this.$store.dispatch('removeCodeCategory', data);
    },
    startEdit() {
      this.isEdit = true;
    },
    abandonEdit() {
      this.categoryName = '';
      this.isEdit = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/buttons';
@import '../assets/styles/category';
@import '../assets/styles/tabs';
</style>
