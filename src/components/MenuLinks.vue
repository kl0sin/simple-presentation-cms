<template>
  <div class="menu-links">
    <div v-if="!isEdit"
         class="menu-link__labels">
      <span>{{ linkName }}</span>
      <span>{{ linkUrl }}</span>
    </div>
    <div v-if="isEdit"
         class="menu-links__inputs">
      <input v-model="linkData.linkName"
             :placeholder="linkNamePlaceholder"
             type="text">
      <input v-model="linkData.linkUrl"
             :placeholder="linkUrlPlaceholder"
             type="text">
    </div>
    <button v-if="isEdit"
            class="btn btn--cancel"
            @click="cancel()">
      <i class="far-fa-save"></i>
      <span>Cancel</span>
    </button>
    <button class="btn btn--add"
            @click="edit()">
      <i class="far fa-save"></i>
      <span>Edit</span>
    </button>
    <button class="btn btn--remove"
            @click="remove()">
      <i class="fas fa-minus-circle"></i>
      <span>Remove</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'menuLinks',
  data() {
    return {
      isEdit: false,
      linkData: {},
      linkName: '',
      linkUrl: '',
      linkNamePlaceholder: '',
      linkUrlPlaceholder: ''
    };
  },
  props: {
    link: Object,
    index: Number
  },
  created() {
    this.getMenuLink();
  },
  methods: {
    getMenuLink() {
      const newObject = JSON.parse(JSON.stringify(this.link));
      this.linkData = newObject;
      this.linkName = newObject.linkName;
      this.linkUrl = newObject.linkUrl;
    },
    updateMenuLink() {
      const newObject = JSON.parse(
        JSON.stringify(
          this.$store.getters.editPresentationData.presentationData.menuLinks[
            this.index
          ]
        )
      );
      this.linkName = newObject.linkName;
      this.linkUrl = newObject.linkUrl;
      this.linkData = newObject;
    },
    edit() {
      if (this.isEdit) {
        this.$store
          .dispatch('editLinkMenu', {
            linkName: this.linkData.linkName,
            linkUrl: this.linkData.linkUrl,
            index: this.index
          })
          .then(() => {
            this.updateMenuLink();
            this.isEdit = false;
          });
      } else {
        this.isEdit = true;
      }
    },
    cancel() {
      this.updateMenuLink();
      this.isEdit = false;
    },
    remove() {
      this.$store.dispatch('removeLinkMenu', this.index);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../assets/styles/menuLinks';
@import '../assets/styles/buttons';
</style>
