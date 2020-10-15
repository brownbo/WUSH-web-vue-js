<template>
  <div @click="gotoDetail" class="container">
    <div
      class="avatar"
      :style="{ backgroundImage: `url(${data.avatar})` }"
    ></div>
    <label class="name">
      {{ data.name }}
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    data: Object,
    gotoDetail: Function,
  },
  mounted() {
    // console.log(this.data.avatar);
  },
});
</script>
<style lang="less" scoped>
.container {
  //   margin-right: 25px;

  //   margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 12px;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.name {
  font-size: 16px;
  margin-top: 10px;
}
</style>
