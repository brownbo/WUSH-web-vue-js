<template>
  <FlowLayout title="好久没吃啦，满足~">
    <div class="container">
      <!-- 属性方式： -->
      <el-input
        placeholder="活动标题"
        suffix-icon="el-icon-date"
        v-model="input1"
      >
      </el-input>
      <el-select class="item" v-model="value" placeholder="吃的啥">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="item-title">不会有缺席的吧？</div>
      <el-checkbox-group class="item" v-model="checkedCities">
        <el-checkbox
          v-for="(member, index) in memberList"
          :label="member.id"
          :key="index"
          >{{ member.name }}</el-checkbox
        >
      </el-checkbox-group>
      <el-input
        class="item"
        type="textarea"
        :rows="2"
        placeholder="具体发生什么啦~"
        v-model="textarea"
      >
      </el-input>
      <div class="item submit">
        <el-button type="primary">点我记录+1~</el-button>
      </div>
    </div>
  </FlowLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Head from '@/components/TheHead.vue';
import FlowLayout from '@/components/Layout/FlowLayout.vue';
import memberList from '@/views/Members/members';

@Component({
  components: {
    Head,
    FlowLayout,
  },
})
export default class New extends Vue {
  input1 = '';
  memberList = memberList;
  textarea = '';
  checkedCities = memberList.map(val => val.id);
  options = [
    {
      value: '选项1',
      label: '黄金糕',
    },
    {
      value: '选项2',
      label: '双皮奶',
    },
    {
      value: '选项3',
      label: '蚵仔煎',
    },
    {
      value: '选项4',
      label: '龙须面',
    },
    {
      value: '选项5',
      label: '北京烤鸭',
    },
  ];
  value = '';
}
</script>

<style lang="less" scoped>
.container {
  padding: 16px;
}
.item {
  margin-top: 16px;
}
.item-title {
  margin-top: 16px;
  font-size: 14px;
}
.submit {
  display: flex;
  justify-content: center;
}
</style>