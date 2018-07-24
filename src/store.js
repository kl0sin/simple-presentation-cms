import * as firebase from 'firebase';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {},
    signInData: {
      emailInvalid: false,
      passwordInvalid: false,
      emailErrorMessage: '',
      passwordErrorMessage: ''
    },
    signUpData: {
      emailInvalid: false,
      passwordInvalid: false,
      emailErrorMessage: '',
      passwordErrorMessage: ''
    },
    welcomePageData: {},
    presentations: [],
    activePresentationData: {},
    editPresentationData: {},
    isRemoveModal: false,
    removePresentationKey: '',
    isLoader: false,
    isActivePresentation: Boolean
  },
  getters: {
    user: state => state.user,
    signInData: state => state.signInData,
    signUpData: state => state.signUpData,
    welcomePageData: state => state.welcomePageData,
    presentations: state => state.presentations,
    editPresentationData: state => state.editPresentationData,
    activePresentationData: state => state.activePresentationData,
    isRemoveModal: state => state.isRemoveModal,
    removePresentationKey: state => state.removePresentationKey,
    isLoader: state => state.isLoader
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    signInUser(state, payload) {
      state.signInData.emailInvalid = false;
      state.signInData.passwordInvalid = false;
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            state.user = user;
          },
          error => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-email') {
              state.signInData.emailInvalid = true;
              state.signInData.emailErrorMessage = 'Invalid email.';
            } else if (errorCode === 'auth/user-disabled') {
              state.signInData.emailInvalid = true;
              state.signInData.emailErrorMessage = 'This account is disabled.';
            } else if (errorCode === 'auth/user-not-found') {
              state.signInData.emailInvalid = true;
              state.signInData.emailErrorMessage = 'Account not found.';
            } else if (errorCode === 'auth/wrong-password') {
              state.signInData.passwordInvalid = true;
              state.signInData.passwordErrorMessage = 'Wrong password';
            }
          }
        );
    },
    logOut(state) {
      state.user = {};
    },
    getContent(state, payload) {
      state.welcomePageData = payload;
    },
    getPresentations(state, payload) {
      state.presentations = payload;
    },
    savePresentation(state, payload) {
      let firebaseKey = firebase
        .database()
        .ref('presentations')
        .push().key;
      firebase
        .database()
        .ref('presentations/' + firebaseKey)
        .set(payload);
    },
    addCodeCategory(state, payload) {
      let newObject = JSON.parse(JSON.stringify(payload));
      state.editPresentationData.presentationData.codeCategories.push(
        newObject
      );
    },
    renameCodeCategory(state, payload) {
      state.editPresentationData.presentationData.codeCategories[
        payload.categoryIndex
      ].categoryName =
        payload.categoryName;
    },
    removeCodeCategory(state, payload) {
      state.editPresentationData.presentationData.codeCategories.splice(
        payload,
        1
      );
    },
    addCodeSnippet(state, payload) {
      let newObject = JSON.parse(JSON.stringify(payload.codeSnippetTemplate));
      state.editPresentationData.presentationData.codeCategories[
        payload.categoryIndex
      ].snippets.push(newObject);
    },
    removeCodeSnippet(state, payload) {
      state.editPresentationData.presentationData.codeCategories[
        payload.categoryIndex
      ].snippets.splice(payload.snippetIndex, 1);
    },
    updateSnippetData(state, payload) {
      state.editPresentationData.presentationData.codeCategories[
        payload.categoryIndex
      ].snippets[payload.snippetIndex] = JSON.parse(
        JSON.stringify(payload.snippet)
      );
    },
    addLinkCategory(state, payload) {
      state.editPresentationData.presentationData.linkCategories.push(
        JSON.parse(JSON.stringify(payload))
      );
    },
    renameLinkCategory(state, payload) {
      state.editPresentationData.presentationData.linkCategories[
        payload.categoryIndex
      ].categoryName =
        payload.categoryName;
    },
    removeLinkCategory(state, payload) {
      state.editPresentationData.presentationData.linkCategories.splice(
        payload,
        1
      );
    },
    addLink(state, payload) {
      let newObject = JSON.parse(JSON.stringify(payload.linkTemplate));
      state.editPresentationData.presentationData.linkCategories[
        payload.categoryIndex
      ].links.push(newObject);
    },
    removeLink(state, payload) {
      state.editPresentationData.presentationData.linkCategories[
        payload.categoryIndex
      ].links.splice(payload.linkIndex, 1);
    },
    updateLinkData(state, payload) {
      state.editPresentationData.presentationData.linkCategories[
        payload.categoryIndex
      ].links[payload.linkIndex] = JSON.parse(JSON.stringify(payload.link));
    },
    addLinkMenu(state, payload) {
      let newObject = JSON.parse(JSON.stringify(payload));
      state.editPresentationData.presentationData.menuLinks.push(newObject);
    },
    editLinkMenu(state, payload) {
      state.editPresentationData.presentationData.menuLinks[payload.index] = {
        linkName: payload.linkName,
        linkUrl: payload.linkUrl
      };
    },
    removeLinkMenu(state, payload) {
      state.editPresentationData.presentationData.menuLinks.splice(payload, 1);
    },
    activePresentation(state, payload) {
      firebase
        .database()
        .ref('activePresentation/')
        .set(payload);
    },
    editPresentation(state, payload) {
      if (!payload.presentationData) {
        const presentationData = {
          codeCategories: [],
          linkCategories: [],
          menuLinks: []
        };
        payload.presentationData = presentationData;
      }
      if (!payload.presentationData.codeCategories) {
        payload.presentationData.codeCategories = [];
      }
      if (!payload.presentationData.linkCategories) {
        payload.presentationData.linkCategories = [];
      }
      if (!payload.presentationData.menuLinks) {
        payload.presentationData.menuLinks = [];
      }
      state.editPresentationData = JSON.parse(JSON.stringify(payload));
    },
    getPresentationData(state, payload) {
      state.activePresentationData = { ...payload };
    },
    cancelEditPresentation(state) {
      state.editPresentationData = {};
    },
    createNewPresentation(state, payload) {
      state.editPresentationData = JSON.parse(JSON.stringify(payload));
    },
    openRemovePresentationModal(state, payload) {
      state.removePresentationKey = payload;
      state.isRemoveModal = true;
    },
    closeRemovePresentationModal(state) {
      state.isRemoveModal = false;
    },
    updatePresentation() {},
    removePresentation() {},
    activePageLoader(state) {
      state.isLoader = true;
    },
    deActivePageLoader(state) {
      state.isLoader = false;
    }
  },
  actions: {
    signInUser({ commit }, payload) {
      commit('signInUser', payload);
    },
    setUser({ commit }, payload) {
      commit('setUser', payload);
    },
    logOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            commit('logOut');
          },
          error => {
            console.log(error);
          }
        );
    },
    getContent({ commit }) {
      firebase
        .database()
        .ref('welcomePage/')
        .on('value', snapshot => {
          commit('getContent', snapshot.val());
        });
    },
    getPresentations({ commit }) {
      firebase
        .database()
        .ref('presentations')
        .on('value', snapshot => {
          let returnArr = [];

          snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
          });
          commit('getPresentations', returnArr);
        });
    },
    savePresentation({ commit, state }, payload) {
      state.editPresentationData.presentationName = payload.presentationName;
      state.editPresentationData.presentationDescription =
        payload.presentationDescription;
      commit('savePresentation', state.editPresentationData);
    },
    updatePresentation({ commit }, payload) {
      const data = {
        presentationName: payload.presentationName,
        presentationDescription: payload.presentationDescription,
        presentationData: payload.presentationData
      };
      firebase
        .database()
        .ref('presentations/' + payload.key)
        .set(data);
      commit('updatePresentation');
    },
    addCodeCategory({ commit }, payload) {
      commit('addCodeCategory', payload);
    },
    renameCodeCategory({ commit }, payload) {
      commit('renameCodeCategory', payload);
    },
    removeCodeCategory({ commit }, payload) {
      commit('removeCodeCategory', payload);
    },
    addCodeSnippet({ commit }, payload) {
      commit('addCodeSnippet', payload);
    },
    removeCodeSnippet({ commit }, payload) {
      commit('removeCodeSnippet', payload);
    },
    updateSnippetData({ commit }, payload) {
      commit('updateSnippetData', payload);
    },
    addLinkCategory({ commit }, payload) {
      commit('addLinkCategory', payload);
    },
    renameLinkCategory({ commit }, payload) {
      commit('renameLinkCategory', payload);
    },
    removeLinkCategory({ commit }, payload) {
      commit('removeLinkCategory', payload);
    },
    addLink({ commit }, payload) {
      commit('addLink', payload);
    },
    updateLinkData({ commit }, payload) {
      commit('updateLinkData', payload);
    },
    removeLink({ commit }, payload) {
      commit('removeLink', payload);
    },
    addLinkMenu({ commit }, payload) {
      commit('addLinkMenu', payload);
    },
    editLinkMenu({ commit }, payload) {
      commit('editLinkMenu', payload);
    },
    removeLinkMenu({ commit }, payload) {
      commit('removeLinkMenu', payload);
    },
    editPresentation({ commit }, payload) {
      commit('editPresentation', payload);
    },
    activePresentation({ commit }, payload) {
      commit('activePresentation', payload);
    },
    getPresentationData({ commit }) {
      firebase
        .database()
        .ref('activePresentation')
        .on('value', snapshot => {
          commit('getPresentationData', snapshot.val());
        });
    },
    cancelEditPresentation({ commit }) {
      commit('cancelEditPresentation');
    },
    createNewPresentation({ commit }, payload) {
      commit('createNewPresentation', payload);
    },
    removePresentation({ commit }, payload) {
      firebase
        .database()
        .ref('presentations/' + payload)
        .remove();
      commit('removePresentation');
    },
    openRemovePresentationModal({ commit }, payload) {
      commit('openRemovePresentationModal', payload);
    },
    closeRemovePresentationModal({ commit }) {
      commit('closeRemovePresentationModal');
    },
    activePageLoader({ commit }) {
      commit('activePageLoader');
    },
    deActivePageLoader({ commit }) {
      commit('deActivePageLoader');
    }
  }
});
