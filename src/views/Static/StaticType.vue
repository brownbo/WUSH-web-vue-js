<template>
  <canvas :id="id" class="canvas" height="150"></canvas>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import FlowLayout from '@/components/Layout/FlowLayout.vue';
import F2 from '@antv/f2/lib/index-all';

export type StaticTypeData = {
  name: string;
  percent: number;
  a: string;
  title: string;
}[];

@Component({
  components: {
    FlowLayout,
  },
})
export default class Static extends Vue {
  @Prop() data?: StaticTypeData;
  @Prop() id?: string;

  @Watch('data')
  onChangeValue(newVal: StaticTypeData, oldVal: StaticTypeData) {
    this.render(newVal || []);
  }
  mounted() {
    this.render(this.data || []);
  }

  render = (data: StaticTypeData) => {
    const chart = new F2.Chart({
      id: this.id,
      pixelRatio: window.devicePixelRatio,
    });
    chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          return val * 100 + '%';
        },
      },
    });
    chart.legend({
      position: 'right',
      itemFormatter: function itemFormatter(val) {
        const tempData = data.find(_data => _data.name === val) || {
          percent: 0,
          title: '',
        };
        return tempData.title + '  ' + tempData.percent * 100 + '%';
      },
    });
    chart.tooltip(false);
    chart.coord('polar', {
      transposed: true,
      radius: 0.85,
    });
    chart.axis(false);
    chart
      .interval()
      .position('a*percent')
      .color('name', [
        '#1890FF',
        '#13C2C2',
        '#2FC25B',
        '#FACC14',
        '#F04864',
        '#8543E0',
      ])
      .adjust('stack')
      .style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round',
      })
      .animate({
        appear: {
          duration: 1200,
          easing: 'bounceOut',
        },
      });

    chart.render();
  };
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