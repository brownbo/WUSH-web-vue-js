<template>
  <FlowLayout title="备注">
    <div class="container">暂未开发，敬请提意见~</div>
  </FlowLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FlowLayout from '@/components/Layout/FlowLayout.vue';
@Component({
  components: {
    FlowLayout,
  },
})
export default class Memo extends Vue {}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
</style>