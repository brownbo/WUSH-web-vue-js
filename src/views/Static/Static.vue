<template>
  <FlowLayout title="吃货统计">
    <div class="title-item">
      爱吃种类统计：
    </div>
    <StaticType id="staticType" :data="storeTypeData"></StaticType>
    <div class="title-item">
      时间统计：
    </div>
    <StaticTime id="staticTime" :data="storeTimeData"></StaticTime>
  </FlowLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import FlowLayout from '@/components/Layout/FlowLayout.vue';
import StaticType, { StaticTypeData } from './StaticType.vue';
import StaticTime from './StaticTime.vue';
import _ from 'lodash';

@Component({
  components: {
    FlowLayout,
    StaticType,
    StaticTime,
  },
})
export default class Static extends Vue {
  typeData: StaticTypeData = [];
  timeData: any = [];

  get storeTimeData() {
    const activities = this.$store.state.activities || [];
    const tempActivities = activities.map((val: any) => ({
      ...val,
      sortTime: val.time,
      time: moment(val.time).format('YYYY/MM'),
    }));
    const newActivities = _.groupBy(tempActivities, 'time');
    const newValues = _.values(newActivities)
      .map((val: any) => {
        return {
          time: val[0].time,
          sales: val.length,
          sortTime: val[0].sortTime,
        };
      })
      .sort((a: any, b: any) => {
        return new Date(a.sortTime).getTime() - new Date(b.sortTime).getTime();
      });
    return newValues;
  }

  get storeTypeData() {
    const types = this.$store.state.types || [];
    const maxData = _.sum(types.map((val: any) => val.count));
    const tempTypes = types.map((val: any) => ({
      title: val.name,
      name: val.id,
      percent: parseFloat((val.count / maxData).toFixed(2)),
      a: '1',
    }));
    return tempTypes;
  }
}
</script>

<style lang="less" scoped>
.canvas {
  width: 375px;
}
.title-item {
  padding: 16px;
  font-size: 16px;
}
</style>
