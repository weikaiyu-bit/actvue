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
    <el-table :data="this.tasks">
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="assignee" label="任务节点"> </el-table-column>
      <el-table-column prop="name" label="处理人"><el-tag type="warning">待认领</el-tag></el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popconfirm title="你确定要拾取该任务吗？" @onConfirm="claim__(scope.row.id)">
            <a href="#" slot="reference" >接收任务</a>
          </el-popconfirm>
          <el-divider direction="vertical"></el-divider>
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
    <AddModal :off__="off__" :dialogVisible="this.dialogVisible" ref="task" />
  </div>
</template>
<script>
import AddModal from "./components/myTaskaddModal.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      input2: "",
      name: "",
      dialogVisible: false,
      // tableData: [],
      record: {},
    };
  },
  components: {
    AddModal,
  },
  computed: {
    ...mapState({
      tasks: (state) => state.leave.tasks,
    }),
  },
  mounted() {
    this.list();
  },
  methods: {
    claim__(id) {

      this.$store.dispatch("leave/claim",{id:id,name:window.localStorage.getItem("name")}).then((res) => {
      this.list();
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
      const name = window.localStorage.getItem("name");
      thiz.$store.dispatch("leave/leavetask", { name: name });
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

    show__(record) {
      this.$refs.task.onRecord(record);
      // this.$refs.task.onRecord(record);
      this.dialogVisible = true;
    },
  },
};
</script>
<style scoped>
#app {
}
</style>
