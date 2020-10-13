<template>
  <canvas :id="id" class="canvas" height="200"></canvas>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import FlowLayout from '@/components/Layout/FlowLayout.vue';
import F2 from '@antv/f2/lib/index-all';

interface TimeData {
  time: string;
  sales: number;
}

export type StaticTimeData = TimeData[];

@Component({
  components: {
    FlowLayout,
  },
})
export default class StaticTime extends Vue {
  @Prop() data?: StaticTimeData;
  @Prop() id?: string;

  @Watch('data')
  onChangeValue(newVal: StaticTimeData, oldVal: StaticTimeData) {
    console.log(newVal, 'newVal');
    this.render(newVal || []);
  }

  mounted() {
    this.render(this.data || []);
  }

  render = (data: StaticTimeData) => {
    const chart = new F2.Chart({
      id: this.id,
      pixelRatio: window.devicePixelRatio,
    });

    chart.scale('time', {
      type: 'timeCat',
      sortable: false,
    });
    chart.source(data, {
      sales: {
        // tickCount: 10,
        // range: [0, 1],
        ticks: ['0', '5', '10'],
      },
    });
    chart.tooltip(false);
    chart.interval().position('time*sales');
    chart.render();

    // 绘制柱状图文本
    const offset = -5;
    const canvas = chart.get('canvas');
    const group = canvas.addGroup();
    const shapes: any = {};
    data.forEach(function(obj) {
      const point = chart.getPosition(obj);
      const text = group.addShape('text', {
        attrs: {
          x: point.x,
          y: point.y + offset,
          text: obj.sales,
          textAlign: 'center',
          textBaseline: 'bottom',
          fill: '#808080',
        },
      });

      shapes[obj.time] = text; // 缓存该 shape, 便于后续查找
    });

    let lastTextShape: any; // 上一个被选中的 text
    // 配置柱状图点击交互
    chart.interaction('interval-select', {
      selectAxisStyle: {
        fill: '#000',
        fontWeight: 'bold',
      },
      mode: 'range',
      //   defaultSelected: {
      //     year: '1962 年',
      //     sales: 38,
      //   },
      onEnd: function onEnd(ev) {
        const data = ev.data,
          selected = ev.selected;

        lastTextShape &&
          lastTextShape.attr({
            fill: '#808080',
            fontWeight: 'normal',
          });
        if (selected) {
          const textShape = shapes[data.time];
          textShape.attr({
            fill: '#000',
            fontWeight: 'bold',
          });
          lastTextShape = textShape;
        }
        canvas.draw();
      },
    });
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