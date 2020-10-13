<template>
  <div>
    <Head :title="title"></Head>
    <div class="content">
      
      <slot></slot>
    </div>
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
.content {
  background-color: #fff;
  min-height: 100vh;
  position: relative;
}
</style>
