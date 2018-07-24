<template>
  <div class="panel">
    <transition name="transition transition--fade">
      <remove-presentation-modal v-if="isRemoveModal"/>
    </transition>
    <avaiable-presentations class="panel--left"/>
      <div class="panel--right">
        <create-new-presentation v-if="!isEdit"/>
        <div v-if="isEdit"
             class="panel__presentation presentation">
          <div class="presentation__input">
            <span>
            Presentation Name
            </span>
            <input v-model="editData.presentationName"
                   type="text"
                   placeholder="Presentation Name">
          </div>
          <div class="presentation__input">
            <span>
            Presentation description
            </span>
            <textarea v-model="editData.presentationDescription"
                      placeholder="Presentation description"></textarea>
          </div>
          <div class="presentation__snippets">
            <h3> Code Snippets</h3>
            <button class="btn btn--add"
                    @click="addNewCodeCategory()">
              <i class="fas fa-plus-circle"></i>
              <span>Add new code category</span>
            </button>
            <code-category v-for="(category, index) in editData.presentationData.codeCategories"
                           :category="category"
                           :categoryIndex="index"
                           :key="'code_category_' + index"/>
          </div>
          <div class="presentation__links">
            <h3>Useful Links</h3>
            <button class="btn btn--add"
                    @click="addNewLinkCategory()">
              <i class="fas fa-plus-circle"></i>
              <span>Add new link category</span>
            </button>
            <link-category v-for="(category, index) in editData.presentationData.linkCategories"
                           :category="category"
                           :categoryIndex="index"
                           :key="'link_category_' + index"/>
          </div>
          <div class="presentation__links">
            <h3>Menu Links</h3>
            <button class="btn btn--add"
                    @click="addNewLink()">
              <i class="fas fa-plus-circle"></i>
              <span>Add new menu link</span>
            </button>
            <menu-links v-for="(link, index) in editData.presentationData.menuLinks"
                        :index="index"
                        :link="link"
                        :key="'menu-link_' + index"/>
          </div>
          <button v-if="!this.editData.key"
                  class="presentation__submit"
                  @click="savePresentation">SAVE PRESENTATION</button>
          <button v-if="this.editData.key"
                  class="presentation__submit"
                  @click="updatePresentation">UPDATE PRESENTATION</button>
          <button class="presentation__submit presentation__submit--cancel"
                  @click="cancelEditPresentation">CANCEL</button>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import avaiablePresentations from '../components/AvaiablePresentations';
import codeCategory from '../components/CodeCategories';
import linkCategory from '../components/LinkCategories';
import createNewPresentation from '../components/CreateNewPresentation';
import removePresentationModal from '../components/RemovePresentationModal';
import menuLinks from '../components/MenuLinks';
import {
  codeCategoryTemplate,
  linkCategoryTemplate,
  menuLinkTemplate
} from '../assets/templates/newItemTemplate';

export default {
  name: 'Panel',
  data() {
    return {
      presentationName: '',
      presentationDescription: '',
      editData: {
        presentationName: '',
        presentationDescription: '',
        presentationData: {}
      },
      isEdit: false
    };
  },
  components: {
    createNewPresentation,
    avaiablePresentations,
    codeCategory,
    linkCategory,
    removePresentationModal,
    menuLinks
  },
  computed: {
    ...mapGetters(['panelPage', 'editPresentationData', 'isRemoveModal'])
  },
  watch: {
    editPresentationData(nData) {
      this.updatePresentationData(nData);
    }
  },
  created() {
    this.getPresentationData();
  },
  methods: {
    savePresentation() {
      if (
        this.editData.presentationName &&
        this.editData.presentationDescription
      ) {
        this.$store.dispatch('savePresentation', {
          presentationName: this.editData.presentationName,
          presentationDescription: this.editData.presentationDescription
        });
      } else {
        console.log('You need fill empty spaces first');
      }
    },
    updatePresentation() {
      console.log(this.editData);
      if (
        this.editData.presentationName &&
        this.editData.presentationDescription
      ) {
        this.$store.dispatch('updatePresentation', this.editData);
      } else {
        console.log('You need fill empty spaces first');
      }
    },
    addNewCodeCategory() {
      this.$store.dispatch('addCodeCategory', codeCategoryTemplate);
    },
    addNewLinkCategory() {
      this.$store.dispatch('addLinkCategory', linkCategoryTemplate);
    },
    getPresentationData() {
      const data = { ...this.$store.getters.editPresentationData };
      if (this.isObjectEmpty(data)) {
        this.isEdit = false;
      } else {
        this.editData = this.$store.getters.editPresentationData;
        this.isEdit = true;
      }
    },
    updatePresentationData(data) {
      const nData = { ...data };
      if (this.isObjectEmpty(nData)) {
        this.isEdit = false;
      } else {
        this.editData = nData;
        this.isEdit = true;
      }
    },
    isObjectEmpty(obj) {
      return Object.getOwnPropertyNames(obj).length === 0;
    },
    cancelEditPresentation() {
      this.$store.dispatch('cancelEditPresentation');
    },
    addNewLink() {
      this.$store.dispatch('addLinkMenu', menuLinkTemplate);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../assets/styles/panel';
@import '../assets/styles/presentationPanel';
@import '../assets/styles/buttons';
@import '../assets/styles/transition';
</style>
