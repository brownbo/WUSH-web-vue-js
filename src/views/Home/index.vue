<template>
  <div class="home">
    <Head />
    <el-carousel height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <div class="banner">{{ item }}</div>
      </el-carousel-item>
    </el-carousel>
    <div>
      <SButton v-for="item in 4" :key="item">
        <div>
          {{ item + 6 }}
        </div>
      </SButton>
    </div>
    <div>
      <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
      <el-divider></el-divider>
      <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
    </div>
    <Static />
    <div @click="changeCount()">222</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import Static from './components/Static.vue';
import SButton from './components/Button.vue';
import Head from '@/components/TheHead.vue';
import { getActiveList } from '@/service/leancloud';

@Component({
  components: {
    HelloWorld,
    Static,
    Head,
    SButton,
  },
})
export default class Home extends Vue {
  // constructor(props) {
  //   super(props);
  //   this.count;
  // }
  count = 1;
  mounted() {
    console.log(this.$store.state);
    Array.from({ length: 10 }, _ => {
      return 3;
    });
    this.getList();
  }

  changeCount() {
    this.count = 333;
    this.$router.push('/about');
  }

  async getList() {
    const res = await getActiveList();
    console.log(res, 'res');
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
}
</style>