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
        <el-input v-model="listQuery.filterValue" placeholder="搜索ID、昵称、手机号码" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
        <el-table-column prop="id" label="ID" width="120">
        </el-table-column>
        <el-table-column prop="userNickname" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="city" label="证件类型" width="80">
        </el-table-column>
        <el-table-column prop="address" label="公民身份号码或护照号码" width="180">
        </el-table-column>
        <el-table-column prop="zip" label="证件照片" width="100" align="center">
          <template slot-scope="scope">
            <el-popover placement="right" width="320" trigger="click">
              <img :src="cardImg" style="width:100%;">
              <el-button slot="reference" @click="preview(scope.row.cardImg, scope.row)" style="border:none; background-color:transparent">
                <i class="el-icon-picture"></i>
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="zip" label="申请时间" width="120">
        </el-table-column>
        <el-table-column prop="zip" label="认证操作" width="160">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-select clearable placeholder="认证" class="filter-item handle-select mr10" @change="setCertify" v-model="scope.row.status">
              <el-option-group v-for="group in handleOptions" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="60">
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
console.log(modelUser);


export default {
  created: function () {
    // this.getData()
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    search: function () {
      this.isSearch = 1;
      this.getData()
    },
    getData: function () {
      console.log('getData');
      var self = this;
      modelUser.getCertifyList(self.listQuery).then(function (e) {
        if (e) {
          self.tableData = e.data.data;
          self.total = e.data.total        }
      }).catch(function (error) {
        console.log(error);
        self.$message.error("服务器错误");
      });
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.listQuery.page = val;
      this.getData();
    },

    setCertify: function (selVal) {
      this.$message.success("操作成功");
      // this.$message.error("操作失败,请重试");
      console.log(selVal);
    },
    preview: function (cardImg, item) {
      console.log(item);
      cardImg = "/static/img/id-card-hd.jpg";
      this.cardImg = cardImg;
      // this.dialogVisible = true;
    },
    gotoUser: function (item) {
      var self = this;
      var id = item.id;
      console.log(id);
      self.$router.push("/user/" + id);
      // router.push("/login");
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
      dialogVisible: false,
      total: 100,
      cardImg: '',
      selected: '',
      isSearch: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
      handleOptions: handleOptions,
      tableData: [{
        id: 1,
        date: '2016-05-03',
        name: '王小虎',
        userNickname: '上海',
        city: '普陀区',
        address: '430123198812121234',
        zip: 200333,
        cardImg: 'aa'
      }, {
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        userNickname: '上海',
        city: '普陀区',
        address: '430123198812121234',
        zip: 200333,
        cardImg: 'aa'
      }, {
        id: 1,
        date: '2016-05-04',
        name: '王小虎',
        userNickname: '上海',
        city: '普陀区',
        address: '430123198812121234',
        zip: 200333,
        cardImg: 'aa'
      }, {
        id: 1,
        date: '2016-05-01',
        name: '王小虎',
        userNickname: '上海',
        city: '普陀区',
        address: '430123198812121234',
        zip: 200333,
        cardImg: 'aa'
      }]
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
