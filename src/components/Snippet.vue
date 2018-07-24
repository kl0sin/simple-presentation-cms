<template>
  <div class="snippet">
    <header @click="toggleCollapse()">
        <span class="snippet__filename">
          {{ snippet.fileName }}
          <span v-if="snippet.label"
                class="snippet__label">
            {{ snippet.label }}
          </span>
        </span>
    </header>
    <pre v-highlightjs="snippet.code">
      <code :class="[snippet.fileType, { 'collapsed' : collapsed }]"></code>
    </pre>
  </div>
</template>

<script>
  export default {
    name: 'Snippet',
    data() {
      return {
        collapsed: false
      };
    },
    props: {
      snippet: Object
    },
    methods: {
      toggleCollapse() {
        this.collapsed ? (this.collapsed = false) : (this.collapsed = true);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../assets/styles/snippet';
</style>
