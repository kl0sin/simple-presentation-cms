<template>
  <nav class="navigation">
    <div class="navigation__user">
    </div>
    <div class="navigation__links">
      <router-link to="/">Home</router-link>
      <router-link v-if="isCodeSnippets"
                   to="/code-snippets">Code Snippets</router-link>
      <router-link v-if="isUsefulLinks"
                   to="/useful-links">Useful Links</router-link>
      <a v-for="(link, index) in menuLinks"
         :key="'menu-link_' + index"
         :href="link.linkUrl"
         target="_blank">
        {{ link.linkName }}
      </a>
      <router-link v-if="isUserLogged"
                   to="/panel">Panel</router-link>
      <button v-if="isUserLogged"
              @click="logOut()">Logout</button>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'navigation',
  data() {
    return {
      userInformation: 'User information',
      isUserLogged: false,
      isCodeSnippets: false,
      isUsefulLinks: false,
      menuLinks: {},
    };
  },
  props: {
    presentation: Object
  },
  computed: {
    ...mapGetters(['user', 'activePresentationData'])
  },
  mounted() {
    this.$nextTick(() => {
      this.checkUser();
    })
  },
  watch: {
    user() {
      this.checkUser();
    },
    activePresentationData() {
      this.updateMenuStatus();
    }
  },
  components: {},
  methods: {
    logOut() {
      this.$store.dispatch('logOut').then(() => {
        this.$router.replace('/sign-in');
      });
    },
    checkUser() {
      if (
        this.user !== null &&
        this.user !== undefined &&
        Object.keys(this.user).length
      ) {
        this.isUserLogged = true;
      }
    },
    updateMenuStatus() {
      this.$store.dispatch('activePageLoader');
      if (this.activePresentationData.presentationData) {
        this.activePresentationData.presentationData.codeCategories
          ? (this.isCodeSnippets = true)
          : (this.isCodeSnippets = false);
        this.activePresentationData.presentationData.linkCategories
          ? (this.isUsefulLinks = true)
          : (this.isUsefulLinks = false);
        this.activePresentationData.presentationData.menuLinks
          ? (this.menuLinks = this.activePresentationData.presentationData.menuLinks)
          : (this.menuLinks = {});
      } else {
        this.isCodeSnippets = false;
        this.isUsefulLinks = false;
      }
      this.$store.dispatch('deActivePageLoader');
    },
  }
};
</script>

<style scoped lang="scss">
@import '../assets/styles/navigation';
</style>
