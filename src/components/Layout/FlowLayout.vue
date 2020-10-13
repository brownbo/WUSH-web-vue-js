<template>
  <div>
    <Head :title="title"></Head>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Head from './Head/Head.vue';
export default Vue.extend({
  props: {
    title: String,
  },
  components: { Head: Head },
});
</script>

<style lang="less" scoped>
</style>
