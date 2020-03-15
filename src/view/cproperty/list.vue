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
            <el-button
              slot="append"
              type="primary"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" @click="show__">新增分类属性</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData">
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="name" label="分类名称"> </el-table-column>

      <el-table-column label="编辑分类属性">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="cproperty__(scope.row)">
            <i class="el-icon-edit"></i>
          </el-button>
        </template>
      </el-table-column>

      <el-table-column label="分类删除">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="delete__(scope.row.id)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增分类属性" :visible.sync="dialogVisible" width="30%">
      <el-input v-model="name" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="off__">取 消</el-button>
        <el-button type="primary" @click="add__">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑分类参数" :visible.sync="editcproperty" width="30%">
      <el-input v-model="datas.name" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="offs__">取 消</el-button>
        <el-button type="primary" @click="adds__">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      name: "",
      datas: {},
      tableData: [], //分类属性
      total: 0,
      input2: "",
      dialogVisible: false,
      editcproperty: false
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.list();
  },
  methods: {
    list() {
      const thiz = this;
      thiz.$axios
        .get("/alter/CProperty/list?id=" + thiz.id + "&start=" + 0)
        .then(res => {
          thiz.tableData = res.data.data.content;
          thiz.total = res.data.data.totalElements;
        });
    },
    add__() {
      const thiz = this;
      window.console.log("thisididid", thiz.id);
      window.console.log("name", thiz.name);
      if (thiz.name.length != 0) {
        thiz.$axios
          .post("/alter/cproperty/add?id=" + thiz.id, { name: thiz.name },)
          .then(res => {
            if (res.data.flag == true) {
              this.$message({
                message: "添加成功",
                type: "success"
              });

              thiz.tableData.unshift(res.data.data);
            }
          });
        this.dialogVisible = false;
      } else {
        this.$message.error("请输入新增分类属性名称");
      }
    },
    cproperty__(row) {
      this.editcproperty = true;
      this.datas = row;
    },
    show__() {
      this.dialogVisible = true;
    },
    off__() {
      this.dialogVisible = false;
      this.$message({
        message: "取消操作",
        type: "warning"
      });
    },
    offs__() {
      this.editcproperty = false;
      this.$message({
        message: "取消操作",
        type: "warning"
      });
    },
    adds__() {
      const thiz = this;
      this.$axios.post("/alter/cproperty/update?id="+thiz.id, thiz.datas).then(res => {
        if (res.data.flag == true) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        }
      this.editcproperty = false;
      });
    },
    delete__(id) {
      const thiz = this;
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          thiz.$axios.get("/alter/cproperty/delete?id=" + id).then(res => {
            if (res.data.flag == true) {
              thiz.$message({
                type: "success",
                message: "删除成功!"
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
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
