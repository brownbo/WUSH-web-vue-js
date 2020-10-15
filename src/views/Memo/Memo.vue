<template>
  <FlowLayout title="活动列表">
    <!-- <div class="container">暂未开发，敬请提意见~</div> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.name"
        :value="item.time"
        @click="() => gotoDetail(item.id)"
      />
    </van-list>
  </FlowLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import FlowLayout from '@/components/Layout/FlowLayout.vue';

@Component({
  components: {
    FlowLayout,
  },
})
export default class Memo extends Vue {
  loading = false;
  finished = true;

  get list() {
    const activities = this.$store.state.activities || [];
    const tempActivities = activities.map((val: any) => ({
      ...val,
      time: moment(val.time).format('YYYY/MM/DD'),
    }));
    return tempActivities;
  }

  onLoad() {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    // setTimeout(() => {
    //   for (let i = 0; i < 10; i++) {
    //     this.list.push(this.list.length + 1);
    //   }

    //   // 加载状态结束
    //   this.loading = false;

    //   // 数据全部加载完成
    //   if (this.list.length >= 40) {
    //     this.finished = true;
    //   }
    // }, 1000);
    this.finished = true;
  }

  gotoDetail = (id: string) => {
    this.$router.push({ path: '/activitiesDetail', query: { id } });
  };
}
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