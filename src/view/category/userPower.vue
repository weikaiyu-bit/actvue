<template>
<div>
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
    </el-breadcrumb>
        <div style="margin:10px 10px">
  <el-row :gutter="20">
  <el-col :span="10">
  <el-input placeholder="请输入内容" v-model="input2">
  <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
  </el-input>
  </el-col>
  <el-col :span="10">
  <el-button type="primary" @click="show__">新增分类</el-button>
</el-col>
  </el-row>
        </div>
    <el-table :data="tableData">
      <el-table-column
        prop="id"
        label="id"
       >
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
       >
      </el-table-column>
      <el-table-column
      label="产品管理"
      >
       <template slot-scope="scope">
        <el-button type="text" size="small" @click="click__(scope.row)">
          <i class="el-icon-edit"></i>
        </el-button>
      </template>
      </el-table-column>

      <el-table-column
      label="分类参数 "
      >
       <template slot-scope="scope">
        <el-button type="text" size="small" @click="cproperty__(scope.row.id)">
          <i class="el-icon-edit"></i>
        </el-button>
      </template>
      </el-table-column>

      <el-table-column
      label="分类删除"
      >
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="delete__(scope.row.id)">
          <i class="el-icon-delete"></i>
        </el-button>
      </template>
    </el-table-column>
    </el-table>


    <el-dialog
  title="新增分类"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <el-input v-model="name"/>
  <span slot="footer" class="dialog-footer">
    <el-button @click="off__">取 消</el-button>
    <el-button type="primary" @click="add__">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
export default {
  data() {
    return {
      input2: "",
      name: "",
      dialogVisible: false,
      tableData: [
        {
          id: "2016-05-02",
          name: "王小虎"
        }
      ]
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    cproperty__(id){  
  this.$router.push({ name: "cproperty", query: { id } });
    },
    delete__(id) {
      const thiz = this;
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          thiz.$axios.get("/alter/category/delete?id=" + id).then(res => {
            if (res.data.flag == true) {
              thiz.$message({
                type: "success",
                message: "删除成功!"
              });
              this.list();
            }else{
                    this.$message.error(res.data);  
              }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    list() {
      const thiz = this;
      thiz.$axios("/alter/category/list").then(res => {
        thiz.tableData = res.data.data;
      });
    },
    handleClick(row) {
      window.console.log(row);
    },
    click__(row) {
      const thiz = this;
      window.console.log("rowrow",row)
      thiz.$router.push({ name: "productlist", query: { id:row.id,cname:row.name } });
    },
    off__() {
      this.dialogVisible = false;
      this.$message({
        message: "取消操作",
        type: "warning"
      });
    },
    add__() {
      const thiz = this;
      if (this.name.length != 0) {
        thiz.$axios
          .post("/alter/category/add", { name: this.name })
          .then(res => {
            if (res.data.flag == true) {
              this.$message({
                message: "添加成功",
                type: "success"
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
    }
  }
};
</script>
<style scoped>
#app {
}
</style>