<template>
  <div class="header">
    <div class="back-wrap">
      <i @click="back" v-if="showBack" class="el-icon-arrow-left"></i>
    </div>
    {{ title || '白富美和高富帅的生活记录' }}
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class TheHead extends Vue {
  // computed() {}
  @Prop() title?: string;

  get showBack() {
    const routeName = this.$router.currentRoute.name;
    return routeName !== 'Home';
  }

  back() {
    this.$router.go(-1);
  }
}
</script>
<style lang="less" scpoed>
.header {
  width: 100%;
  height: 50px;
  background-color: #70bd8e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #fff;
  position: relative;
}
.back-wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding-left: 16px;
}
</style>
