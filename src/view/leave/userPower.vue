<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin:10px 10px">
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button type="primary" @click="show__">填写请假单</el-button>
        </el-col>
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="input2">
            <el-button
              slot="append"
              type="primary"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <el-table :data="this.tableData">
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="name" label="请假人"> </el-table-column>
      <el-table-column prop="days" label="请假天数"> </el-table-column>
      <el-table-column prop="reason" label="请假原因"> </el-table-column>
      <el-table-column prop="remarks" label="请假描述"> </el-table-column>
      <el-table-column prop="createData" label="申请时间"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag  v-if="scope.row.status == '0'"
            >初始化录入</el-tag
          >
          <el-tag type="info" v-else-if="scope.row.status == '1'"
            >待提交</el-tag
          >
          <el-tag type="warning" v-else-if="scope.row.status == '2'"
            >审核中</el-tag
          >
          <el-tag type="success" v-else-if="scope.row.status == '3'"
            >已完成</el-tag
          >
          <el-tag type="danger" v-else-if="scope.row.status == '4'"
            >已拒绝请假</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip
            content="启动请假流程"
            placement="top"
            v-if="scope.row.status == '0'"
          >
            <el-button type="text" size="small" @click="onRun(scope.row.id)">
              <i class="el-icon-video-play"></i>
            </el-button>
          </el-tooltip>
          <el-divider direction="vertical"></el-divider>
          <el-tooltip content="删除请假单" placement="top">
            <el-button type="text" size="small" @click="delete__(scope.row.id)">
              <i class="el-icon-delete" @click="delete__(scope.row.id)"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="查看批注信息" placement="top" v-if="!(scope.row.status=='0'||scope.row.status=='1')">
            <el-button type="text" size="small" @click="listHistory__(scope.row.id)">
              <i class="el-icon-view"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-dialog title="新增分类" :visible.sync="dialogVisible" width="30%">
      <el-input v-model="name" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="off__">取 消</el-button>
        <el-button type="primary" @click="add__">确 定</el-button>
      </span>
    </el-dialog> -->
    <AddModal :off__="off__" :dialogVisible="this.dialogVisible" />
    <HistoryModal :historyoff__="historyoff__" :historyVisible="this.historyVisible" ref="history"/>
  </div>
</template>
<script>
import AddModal from "./components/leaveAddModal.vue";
import HistoryModal from "./components/historyModal.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      input2: "",
      name: "",
      dialogVisible: false,
      // tableData: [],
      historyVisible:false
    };
  },
  components: {
    AddModal,
    HistoryModal
  },
  computed: {
    ...mapState({
      tableData: (state) => state.leave.tableData,
    }),
  },
  mounted() {
    this.list();
  },
  methods: {
    listHistory__(id){
      this.$refs.history.onHistory(id);
      this.historyVisible = true;

    },
    onRun(id) {
      const thiz = this;
      this.$store.dispatch("leave/runTime", { id: id }).then((res) => {
        switch (res.code) {
          case "SUCCESS":
            thiz.$message({
              message: "提交成功，等待审核",
              type: "success",
            });
            thiz.$store.dispatch("leave/findPage", { id: window.localStorage.getItem("id") });
            break;
          case "FAIL":
            thiz.$message.error("提交审核失败");
            break;
        }
      });
    },
    cproperty__(id) {
      this.$router.push({ name: "cproperty", query: { id } });
    },
    delete__(id) {
      const thiz = this;
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          thiz.$axios.get("/alter/category/delete?id=" + id).then((res) => {
            if (res.data.flag == true) {
              thiz.$message({
                type: "success",
                message: "删除成功!",
              });
              this.list();
            } else {
              this.$message.error(res.data);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    list() {
      const thiz = this;
      const id = window.localStorage.getItem("id");
      thiz.$store.dispatch("leave/findPage", { id: id });
      // thiz
      //   .$axios(
      //     "/api/process/leave/findPage?id=" + window.localStorage.getItem("id")
      //   )
      //   .then((res) => {
      //     thiz.tableData = res.data.data;
      //   });
    },
    handleClick(row) {
      window.console.log(row);
    },
    click__(row) {
      const thiz = this;
      window.console.log("rowrow", row);
      thiz.$router.push({
        name: "productlist",
        query: { id: row.id, cname: row.name },
      });
    },
    off__() {
      this.dialogVisible = false;
    },
    historyoff__(){
      this.historyVisible=false
    },
    add__() {
      const thiz = this;
      if (this.name.length != 0) {
        thiz.$axios
          .post("/alter/category/add", { name: this.name })
          .then((res) => {
            if (res.data.flag == true) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.list();
            }
          });
        this.dialogVisible = false;
      } else {
        this.$message.error("请输入新增分类名称");
      }
    },
    show__() {
      this.dialogVisible = true;
    },
  },
};
</script>
<style scoped>
#app {
}
</style>
