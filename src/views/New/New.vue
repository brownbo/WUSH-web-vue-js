<template>
  <FlowLayout title="好久没吃啦，满足~">
    <div class="container">
      <!-- 属性方式： -->
      <el-input placeholder="活动标题" v-model="name"> </el-input>
      <el-upload
        class="item"
        action=""
        :http-request="upload"
        :limit="1"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">上传图片</el-button>
      </el-upload>
      <el-date-picker
        class="item"
        v-model="time"
        type="date"
        placeholder="选择日期"
        :editable="false"
      >
      </el-date-picker>
      <div class="item">
        <el-radio v-model="radio" label="1">从吃过的选</el-radio>
        <el-radio v-model="radio" label="2">这次吃的是没吃过的</el-radio>
      </div>
      <el-select v-if="radio == 1" v-model="type" placeholder="吃的啥">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input v-if="radio == 2" placeholder="吃的啥" v-model="eatWhat">
      </el-input>
      <div class="item-title">不会有缺席的吧？</div>
      <el-checkbox-group v-model="membersChoose">
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
        v-model="desc"
      >
      </el-input>
      <div class="item submit">
        <el-button @click="submit" type="primary">点我记录+1~</el-button>
      </div>
    </div>
  </FlowLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FlowLayout from '@/components/Layout/FlowLayout.vue';
import memberList from '@/views/Members/members';
import {
  saveActive,
  saveActiveType,
  saveFile,
  updateActiveType,
  getPointer,
} from '@/service/leancloud';

@Component({
  components: {
    FlowLayout,
  },
})
export default class New extends Vue {
  name = '';
  memberList = memberList;
  desc = '';
  radio = '1';
  time = '';
  fileList = [];
  eatWhat = '';
  banner: any;
  membersChoose = memberList.map(val => val.id);
  type = '';

  get typeOptions() {
    const types = this.$store.state.types;
    const options = types.map((val: any) => ({
      value: val.id,
      label: val.name,
    }));
    return options;
  }

  async upload(file: any) {
    const res = await saveFile(file.file);
    this.banner = res;
  }

  async submit() {
    if (!this.banner) {
      this.$message({
        message: '没有上传Banner奥~',
        type: 'warning',
        customClass: 'message-tips',
      });
      return;
    }
    const eatType = this.radio;
    const params: any = {
      name: this.name,
      time: this.time,
      desc: this.desc,
      members: this.membersChoose,
      banner: this.banner,
    };
    if (eatType === '1') {
      params.type = getPointer('ActiveType', this.type);
      await updateActiveType(this.type);
    } else {
      const tempType = await saveActiveType({ name: this.eatWhat, count: 1 });
      params.type = tempType;
    }
    await saveActive(params);
    this.$store.dispatch('getAllData', true);
    this.$message({
      message: '新增成功~',
      type: 'success',
      customClass: 'message-tips',
    });
    this.$router.push({ path: '/' });
  }
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
  margin-bottom: 4px;
}
.submit {
  display: flex;
  justify-content: center;
}
.divider {
  margin: 10px 0;
}
</style>