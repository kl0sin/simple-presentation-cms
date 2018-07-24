<template>
  <div class="no-presentation">
    <span class="no-presentation__label">
      {{ noPresentationInfo }}
    </span>
    <i class="far fa-sad-cry"></i>
    <span class="no-presentation__label no-presentation__label--footer">
      {{ noPresentationFooter }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'noPresentationActive',
  data() {
    return {
      isPresentation: Boolean,
      noPresentationInfo: 'Sorry, there is no active presentation!',
      noPresentationFooter: 'Try again later!'
    };
  }
};
</script>

<style scoped lang="scss">
@import '../assets/styles/noActivePresentation';
</style>
