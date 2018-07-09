<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/product' }">
          <i class="el-icon-tickets"></i> 用户资料</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container" style="width:60%;">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="ID">
          <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号码(可改)">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="国家(可改)">
          <el-select v-model="form.country" placeholder="请选择国家">
            <el-option v-for="item in country" :key="item.id" :label="item.name + '(' +item.telCode+')'" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="form.slogan" disabled></el-input>
        </el-form-item>
        <el-form-item label="邀请码">
          <el-input v-model="form.inviteCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="实名认证">
          <el-switch v-model="form.certified" disabled></el-switch>
        </el-form-item>

        <el-form-item label="身份">
          <el-checkbox label="活力兔" v-model="form.isTuzyActive" disabled></el-checkbox>
          <el-checkbox label="和平兔" v-model="form.isTuzyVip_1" disabled></el-checkbox>
          <el-checkbox label="喜悦兔" v-model="form.isTuzyVip_2" disabled></el-checkbox>
          <el-checkbox label="富足兔" v-model="form.isTuzyVip_3" disabled></el-checkbox>
        </el-form-item>
        <el-form-item label="师父">
          <div>{{master }}</div>
        </el-form-item>
        <el-form-item label="徒弟/人">
          <el-input v-model="form.inviteCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="粉丝/人">
          <el-input v-model="form.inviteCode" disabled></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import country from "@/components/common/Country";
console.log(country);
export default {
  data() {
    return {
      country:country,
      form: {
        id: '102343242',
        nickname: '蓝色天空',
        phone: '13412344321',
        country: 2,
        slogan: '蓝色天空，美丽心情',
        inviteCode: 'TX007',
        certified: true,
        isTuzyActive: true,
        isTuzyVip_1: 0,
        isTuzyVip_2: 0,
        isTuzyVip_3: 0,

      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
  },
  computed: {
    master: function () {
      return '快乐心情' + '(' + 10000 + ')';
    }
    // vipType: {
    //   // getter
    //   get: function () {
    //     return this.isTuzyActive + ',' + this.isTuzyVip_1 + ',' + this.isTuzyVip_2 + ',' + this.isTuzyVip_3
    //   },
    //   // setter
    //   set: function (newValue) {
    //     this.vipType = 1;
    //   }
    // }
  }
}
</script>
<style scoped>
</style>
