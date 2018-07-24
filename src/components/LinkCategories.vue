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
            @click="addLink(categoryIndex)">
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
      <example-link v-for="(link, index) in category.links"
               :link="link"
               :linkIndex="index"
               :categoryIndex="categoryIndex"
               :key="'link_' + index"/>
    </div>
  </div>
</template>

<script>
import exampleLink from '../components/Link';
import { linkTemplate } from '../assets/templates/newItemTemplate';

export default {
  name: 'LinkCategories',
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
    exampleLink
  },
  methods: {
    toggleActive() {
      this.isActive ? (this.isActive = false) : (this.isActive = true);
    },
    addLink(categoryIndex) {
      this.$store.dispatch('addLink', {
        linkTemplate: linkTemplate,
        categoryIndex: categoryIndex
      });
    },
    renameCategory(categoryIndex) {
      this.$store
        .dispatch('renameLinkCategory', {
          categoryIndex: categoryIndex,
          categoryName: this.categoryName
        })
        .then(() => {
          this.isEdit = false;
        });
    },
    removeCategory(categoryIndex) {
      this.$store.dispatch('removeLinkCategory', categoryIndex);
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

<style scoped lang="scss">
@import '../assets/styles/buttons';
@import '../assets/styles/category';
@import '../assets/styles/tabs';
</style>
