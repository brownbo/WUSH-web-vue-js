<template>
  <div class="button" :style="{ backgroundColor: buttonColor }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class Button extends Vue {
  @Prop() child?: ChildNode;
  @Prop() backgroundColor?: string;

  get buttonColor() {
    return this.backgroundColor || '#eee';
  }
  // tempColor = Math.random() * 155 + 100;
  buttonStyle = `rgb(${Math.random() * 100 + 100},${Math.random() * 155 +
    100},${Math.random() * 155 + 100} )`;
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
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>