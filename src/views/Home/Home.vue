<template>
  <FlowLayout>
    <!-- <div class="home"> -->
    <!-- <Head /> -->
    <div class="banner"></div>
    <div class="button-wrap">
      <SButton
        :backgroundColor="item.backgroundColor"
        v-for="(item, index) in iconlist"
        :key="index"
      >
        <div @click="() => gotoPage(item.url)">
          <i :class="item.icon"></i>
        </div>
      </SButton>
    </div>
    <div class="list">
      <div
        @click="() => gotoDetail(item.id)"
        v-for="item in activitiesList"
        :key="item.id"
      >
        <div class="list-item">
          <span class="item-time">{{ item.time }}</span>
          <span class="item-title">{{ item.name }}</span>
        </div>

        <el-divider class="divider"></el-divider>
      </div>
    </div>
    <!-- </div> -->
  </FlowLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import FlowLayout from '@/components/Layout/FlowLayout.vue';
import SButton from './components/Button.vue';
import { getActiveList } from '@/service/leancloud';

// import BANNERIMG from '@/assets/timg.jepg';

type IconUrls = 'add' | 'members' | 'static' | 'memo';

type IconArray = { icon: string; url: IconUrls; backgroundColor: string }[];
@Component({
  components: {
    SButton,
    FlowLayout,
  },
})
export default class Home extends Vue {
  count = 1;
  activeList: any[] = [];
  iconlist: IconArray = [
    {
      icon: 'el-icon-circle-plus-outline',
      url: 'add',
      backgroundColor: '#ecc15e',
    },
    {
      icon: 'el-icon-s-custom',
      url: 'members',
      backgroundColor: '#e58a83',
    },
    {
      icon: 'el-icon-pie-chart',
      url: 'static',
      backgroundColor: '#dd6d91',
    },
    {
      icon: 'el-icon-tickets',
      url: 'memo',
      backgroundColor: '#a56cd8',
    },
  ];

  get momentTime() {
    return moment(new Date()).format('YYYY/MM/DD');
  }

  get activitiesList() {
    const activities = this.$store.state.activities || [];
    const tempActivities = activities.map((val: any) => ({
      ...val,
      time: moment(val.time).format('YYYY/MM/DD'),
    }));
    return tempActivities;
  }

  mounted() {
    const loading = this.$loading({
      lock: true,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      customClass: 'loading',
    });
    this.$store.dispatch('getAllData').then(() => {
      loading.close();
    });
  }

  gotoPage(url: IconUrls) {
    this.$router.push({ path: url });
  }

  gotoDetail = (id: string) => {
    this.$router.push({ path: '/activitiesDetail', query: { id } });
  };

  async getList() {
    const res = await getActiveList();
    const _res = res.map((val: any) => {
      val.attributes.time = moment(val.attributes.time).format('YYYY/MM/DD');
      return val;
    });
    this.activeList = _res;
  }
}
</script>

<style lang="less" scoped>
.banner {
  display: flex;
  align-items: center;
  background-color: chartreuse;
  height: 150px;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('../../assets/all.jpg');
}
.button-wrap {
  display: flex;
  justify-content: space-between;
  margin: 0 16px;
  margin-top: 16px;
}
.list {
  margin-top: 16px;
}

.list-item {
  padding: 0 16px;
  display: flex;
  align-items: center;
}

.item-time {
  font-size: 14px;
  color: #999;
  margin-right: 10px;
}

.item-title {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  word-break: break-all;
}
.divider {
  margin: 16px 0;
}
.loading {
  color: #fff;
}
</style>