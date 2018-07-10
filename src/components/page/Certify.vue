<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="el-icon-tickets"></i> 用户认证</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="listQuery.search" placeholder="搜索ID、昵称、手机号码" class="handle-input mr10" @keyup.native.enter="search">
        </el-input>
        <el-button icon="el-icon-search" type="primary" @click="search">搜索</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" ref="multipleTable" v-loading="loading">
        <el-table-column prop="userId" label="ID" width="120">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="city" label="证件类型" width="70">
          <template slot-scope="scope">
            {{scope.row.idType|getIdTypeTxt}}
          </template>
        </el-table-column>
        <el-table-column prop="identity" label="公民身份号码或护照号码" width="180">
        </el-table-column>
        <el-table-column prop="idFrontOutUrl" label="证件照片" width="80" align="center">
          <template slot-scope="scope">
            <el-popover placement="right" width="320" trigger="click">
              <img :src="cardImg" style="width:100%;">
              <el-button slot="reference" @click="preview(scope.row.idFrontOutUrl, scope.row)" style="border:none; background-color:transparent">
                <i class="el-icon-picture"></i>
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间" width="150">
          <template slot-scope="scope">
            {{scope.row.createTime|dateLocalString}}
          </template>
        </el-table-column>
        <el-table-column label="认证操作" width="160">
          <template slot-scope="scope">
            <el-select placeholder="认证" class="filter-item handle-select mr10" @change="setCertify($event, scope.row.id)" v-model="certifyTypeCur">
              <el-option-group v-for="group in handleOptions" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="gotoUser(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="total" :page-size="listQuery.limit">
        </el-pagination>
      </div>
      <!-- <el-dialog title="证件图片预览" :visible.sync="dialogVisible" width="70%">
        <img :src="cardImg" style="width:90%;">

      </el-dialog> -->
    </div>
  </div>

</template>

<script>

import modelUser from "@/components/model/user";
const idTypeConfig = {
  1: '身份证',
  2: '护照'
};

export default {
  created: function () {
    this.getData()
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    dateLocalString: function (value) {
      if (!value) {
        return '';
      }
      let d = new Date(value);
      return d.toLocaleString();
    },
    getIdTypeTxt: function (value) {
      if (typeof idTypeConfig[value] != 'undefined') {
        return idTypeConfig[value];
      } else {
        return '';
      }

    }
  },
  methods: {

    search: function () {
      this.isSearch = 1;
      this.getData()
      console.log('search clicked');
    },
    getData: function () {

      console.log('getData');
      var self = this;
      self.loading = true;
      modelUser.getCertifyList(self.listQuery).then(function (e) {
        if (e) {
          console.log(e.data);
          var data = e.data.data;
          self.tableData = data.items;
          self.total = data.totalCount
        }
        self.loading = false;
      }).catch(function (error) {
        console.log(error);
        self.$message.error("服务器错误");
        self.loading = false;
      });
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.listQuery.page = val;
      this.getData();
    },

    setCertify: function (selVal, id) {

      var self = this;
      self.loading = false;
      var data = {};
      if (selVal == "0") {
        data.verify_state = 2;
        data.reason_type = 0;
      } else {
        data.verify_state = 3;
        data.reason_type = +selVal;
      }
      modelUser.setCertify(data, id).then(function (e) {
        if (e) {
          var code = e.data.code;
          if (code === 200) {
            self.$message.success("操作成功");
          } else {
            self.$message.error("操作失败,请重试");
          }
        }
        self.loading = false;
      }).catch(function () {
        self.$message.error("服务器错误");
        self.loading = false;
      });
    },
    preview: function (cardImg, item) {
      console.log(item);
      cardImg = "/static/img/id-card-hd.jpg";
      this.cardImg = cardImg;
    },
    gotoUser: function (item) {
      var self = this;
      var id = item.userId;
      console.log(id);
      self.$router.push("/user/" + id);
    }
  },

  data() {
    var handleOptions = [{
      label: '',
      options: [{
        value: '0',
        label: '成功'
      }]
    }, {
      label: '失败',
      options: [{
        value: '1',
        label: '姓氏不正确'
      }, {
        value: '2',
        label: '名字不正确'
      }, {
        value: '3',
        label: '身份证件类型不正确'
      }, {
        value: '4',
        label: '公民身份证号码或者护照号码不正确'
      }, {
        value: '5',
        label: '证件图片不清晰'
      }]
    }];
    return {
      loading: true,
      dialogVisible: false,
      total: 1,
      cardImg: '',
      selected: '',
      isSearch: 0,
      certifyTypeCur: '',
      listQuery: {
        search: '',
        page: 1,
        limit: 10,
      },
      handleOptions: handleOptions,
      tableData: []
    }
  }
}
</script>
<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.demo-table-expand .el-form-item label {
  width: 90px;
  color: #99a9bf !important;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-icon-picture {
  font-size: 2em;
}

.btn-card-preview {
  cursor: pointer;
}
</style>
