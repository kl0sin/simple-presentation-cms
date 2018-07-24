<template>
  <div class="card">
    <div :class="['card__tab', { 'card__tab--active' : isActive }]"
         @click="toggleActive()">
      {{ link.linkName }}
    </div>
    <button class="btn btn--remove"
            @click="removeItem(categoryIndex, linkIndex)">
      <i class="fas fa-minus-circle"></i>
      <span>Remove</span>
    </button>
    <div :class="['card__content', { 'card__content--active' : isActive }]">
      <div class="card__item item">
        <span>Link Name</span>
        <span class="item__label"
              v-if="!isEdit"
              v-text="linkData.linkName"></span>
        <input v-else
               type="text"
               :placeholder="linkNamePlaceholder"
               v-model="linkData.linkName">
      </div>
      <div class="card__item">
        <span>Display Url</span>
        <span class="item__label"
              v-if="!isEdit"
              v-text="linkData.displayUrl"></span>
        <input v-else
               type="text"
               :placeholder="displayUrlPlaceholder"
               v-model="linkData.displayUrl">
      </div>
      <div class="card__item">
        <span>Link Url</span>
        <span class="item__label"
              v-if="!isEdit"
              v-text="linkData.linkUrl"></span>
        <input v-else
               type="text"
               :placeholder="linkUrlPlaceHolder"
               v-model="linkData.linkUrl">
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
                @click="saveLinkData(categoryIndex, linkIndex)">
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
    name: 'exampleLink',
    data() {
      return {
        isActive: false,
        isEdit: false,
        linkData: {
          linkName: '',
          displayUrl: '',
          linkUrl: ''
        },
        linkNamePlaceholder: 'Insert link name',
        linkUrlPlaceHolder: 'Insert link URL',
        displayUrlPlaceholder: 'Insert display URL',
      }
    },
    props: {
      link: Object,
      linkIndex: Number,
      categoryIndex: Number
    },
    computed: {
      ...mapGetters([ 'editPresentationData' ]),
    },
    created() {
      this.getLinkData();
    },
    watch: {
      linkData(nData) {
        this.linkData = nData;
      }
    },
    methods: {
      toggleActive() {
        this.isActive ? this.isActive = false : this.isActive = true;
      },
      removeItem(categoryIndex, linkIndex) {
        this.$store.dispatch('removeLink', { categoryIndex: categoryIndex, linkIndex: linkIndex });
      },
      toggleEdit() {
        this.isEdit ? this.isEdit = false : this.isEdit = true;
      },
      getLinkData() {
        this.linkData = JSON.parse(JSON.stringify(this.link));
      },
      updateLinkData(categoryIndex, linkIndex) {
        let updatedData = this.$store.getters.editPresentationData.presentationData.linkCategories[categoryIndex].links[linkIndex];
        this.link.linkName = updatedData.linkName;
      },
      saveLinkData(categoryIndex, linkIndex) {
        this.$store.dispatch('updateLinkData', { linkIndex: linkIndex, categoryIndex: categoryIndex, link: this.linkData });
        this.updateLinkData(categoryIndex, linkIndex);
        this.isActive = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/tabs';
  @import '../assets/styles/buttons';
</style>
