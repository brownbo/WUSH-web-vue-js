<template>
  <div class="button"><slot></slot></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class Button extends Vue {
  @Prop() child?: ChildNode;

  mounted() {
    console.log(this.$slots.default);
  }
}
</script>

<style lang="less" scoped>
.button {
  width: 60px;
  height: 60px;
  background-color: chocolate;
  border-radius: 8px;
}
</style>