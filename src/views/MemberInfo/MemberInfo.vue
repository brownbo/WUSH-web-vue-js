<template>
  <FlowLayout :title="`${memberInfo.name}的个人信息`">
    <div class="container">
      <div class="info-wrap">
        <div
          :style="{ backgroundImage: `url(${memberInfo.avatar})` }"
          class="avatar"
        ></div>
        <div class="detail-wrap">
          <label class="detail-item">姓名：{{ memberInfo.name }}</label>
          <label class="detail-item">生日：{{ memberInfo.birthday }}</label>
          <label class="detail-item">爱好：{{ memberInfo.hobby }}</label>
          <!-- <label class="detail-item">喜欢吃：{{ memberInfo.name }}</label> -->
        </div>
      </div>
      <div class="img-wrap"></div>
    </div>
  </FlowLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FlowLayout from '@/components/Layout/FlowLayout.vue';
import memberList from '@/views/Members/members';

@Component({
  components: {
    FlowLayout,
  },
})
export default class Memo extends Vue {
  get memberInfo() {
    const id = this.$route.query.id;
    return memberList.find(val => val.id === ~~id);
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 16px;
}
.info-wrap {
  display: flex;
}
.avatar {
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.detail-wrap {
  //   flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  justify-content: space-between;
}
.detail-item {
  white-space: pre-wrap;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
}
</style>