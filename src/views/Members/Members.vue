<template>
  <FlowLayout title="白富美和其他">
    <div class="avatar-list">
      <Avatar
        v-for="(item, index) in memberList"
        :key="index"
        :data="item"
        :gotoDetail="() => gotoDetail(item.id)"
      ></Avatar>
    </div>
  </FlowLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FlowLayout from '@/components/Layout/FlowLayout.vue';
import Avatar from './components/Avatar.vue';
import memberList from './members';
@Component({
  components: {
    Avatar,
    FlowLayout,
  },
})
export default class Members extends Vue {
  memberList = memberList;
  mounted() {
    console.log(memberList, 'memberList');
  }
  gotoDetail = (id: number) => {
    this.$router.push({ path: '/memberInfo', query: { id: id.toString() } });
  };
}
</script>

<style lang="less" scoped>
.avatar-list {
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  justify-content: space-between;
  // margin-right: -24px;
}
</style>