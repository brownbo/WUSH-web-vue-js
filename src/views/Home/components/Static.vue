<template>
  <div>
    <div id="c1"></div>
    <h1 class="name">aini</h1>
    <h1 class="namesex">aini</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import { Chart } from '@antv/g2';
import { getChatMessage } from '@/service';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  mounted() {
    console.log(this.$store.state);
    Array.from({ length: 10 }, _ => {
      return 3;
    });
    this.render();
    this.testMessage();
  }

  testMessage = async () => {
    // const res = await getChatMessage('你好');
    // console.log(res, 'res');
  };

  render = () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];

    // Step 1: 创建 Chart 对象
    const chart = new Chart({
      container: 'c1', // 指定图表容器 ID
      width: 600, // 指定图表宽度
      height: 300, // 指定图表高度
    });

    // Step 2: 载入数据源
    chart.data(data);

    // Step 3：创建图形语法，绘制柱状图
    chart.interval().position('genre*sold');

    // Step 4: 渲染图表
    chart.render();
  };
}
</script>

<style scoped lang="less">
.name {
  color: red;

  &sex {
    width: 10rem;
    font-size: 16px;
  }
}
</style>
