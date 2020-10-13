<template>
  <FlowLayout title="活动详情">
    <div :style="{ backgroundImage: `url(${bannerUrl})` }" class="banner"></div>
    <div class="container">
      <div class="title-wrap">
        <div class="title">
          {{ data.name }}
        </div>
        <div class="time">
          {{ activeTime }}
        </div>
      </div>

      <div class="content">
        {{ data.desc }}
      </div>
      <div class="footer-item">
        <div>参与人员：</div>
        <div class="members">{{ joinedMembers }}</div>
      </div>
      <div class="footer-item">
        <div>批斗人员：</div>
        <div class="members">{{ unJoinedMembers }}</div>
      </div>
    </div>
  </FlowLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getActiveDetail } from '@/service/leancloud';
import FlowLayout from '@/components/Layout/FlowLayout.vue';
import moment from 'moment';
import Head from '@/components/TheHead.vue';
import memberList from '../Members/members';

@Component({
  components: {
    Head,
    FlowLayout,
  },
})
export default class ActivitiesDetail extends Vue {
  data: any = {};
  mounted() {
    console.log(777);
    this.getDetail();
  }

  async getDetail() {
    const id = this.$route.query.id;
    console.log(this.$route, 'id');
    const _res: any = await getActiveDetail(id as string);
    this.data = (_res && _res[0] && _res[0].attributes) || {};
  }

  get activeTime() {
    return (
      (this.data.time && moment(this.data.time).format('YYYY/MM/DD')) || ''
    );
  }

  get bannerUrl() {
    return (
      (this.data.banner && this.data.banner.url && this.data.banner.url()) ||
      '../../assets/timg.jpeg'
    );
  }

  get joinedMembers() {
    const joinedIds = this.data.members || [];
    const hasJoind = memberList.filter(val => joinedIds.includes(val.id));
    return hasJoind.map(val => val.name).join('、');
  }

  get unJoinedMembers() {
    const joinedIds = this.data.members || [];
    const hasJoind = memberList.filter(val => !joinedIds.includes(val.id));
    return hasJoind.map(val => val.name).join('、');
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 16px;
}
.banner {
  display: flex;
  align-items: center;
  height: 150px;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('../../assets/timg.jpeg');
}
.title {
  font-size: 20px;
}
.time {
  height: 100%;
  display: flex;
  align-items: flex-end;
  font-size: 12px;
  color: #999;
}
.content {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  min-height: 200px;
}
.footer-item {
  display: flex;
  font-size: 12px;
  color: #999;
}
.title-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.members {
  flex: 1;
}
</style>