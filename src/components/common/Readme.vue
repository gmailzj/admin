<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="el-icon-tickets"></i> 首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="ms-doc">
      <section class="data_section">
        <el-row :gutter="20" style="margin-bottom: 10px;">
          <el-col :span="4">
            <div class="data_list today_head">
              <span class="data_num head">数据统计：</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="data_list">
              用户总数:
              <span class="data_num">{{totalUserCount}}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="data_list">
              今日登录:
              <span class="data_num">{{todayLogin}}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="data_list">
              今日新增:
              <span class="data_num">{{todayNewUser}}</span>
            </div>
          </el-col>
        </el-row>
      </section>
    </div>
  </div>

</template>

<script>
  export default {
    name: "app",
    data() {
      return {
        totalUserCount: 0,
        todayLogin: 0,
        todayNewUser: 0
      };
    }
  };
</script>

<style scoped>
  .allcover {
    position: absolute;
    top: 0;
    right: 0
  }

  .ctt {
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%)
  }

  .ctt,
  .tb {
    position: absolute;
    top: 50%
  }

  .tb {
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%)
  }

  .lr {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%)
  }

  .data_section {
    padding: 20px;
    margin-bottom: 40px
  }

  .data_section .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px
  }

  .data_section .data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #e5e9f2
  }

  .data_section .data_list .data_num {
    color: #333;
    font-size: 26px
  }

  .data_section .data_list .head {
    border-radius: 6px;
    font-size: 22px;
    padding: 4px 0;
    color: #fff;
    display: inline-block
  }

  .data_section .today_head {
    background: #ff9800
  }

  .data_section .all_head {
    background: #20a0ff
  }

  .wan {
    font-size: 16px;
    color: #333
  }
</style>
