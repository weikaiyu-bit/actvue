<template>
  <div>   
   <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/power' }">{{this.$route.query.cname}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/productlist?id='+this.zid+'&cname='+this.$route.query.cname}">{{this.$route.query.pname}}</el-breadcrumb-item>
      <el-breadcrumb-item>属性设置</el-breadcrumb-item>
    </el-breadcrumb>
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="id"
      label="id"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="属性名称"
    >
    </el-table-column>
 <el-table-column
      label="设置属性值"
     >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">设置</el-button>
      </template>
    </el-table-column>
 <el-table-column
      label="编辑属性"
     >
      <template slot-scope="scope">
        <el-button @click="updateProperty(scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
 <el-table-column
      label="删除"
      >
      <template slot-scope="scope">
        <el-button @click="delete__(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>  

    <div style="text-align:center">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="total"
      >
      </el-pagination>
    </div>
    
   <div style="text-algin:center">
  <el-row>
        <el-col :span="8"></el-col>
         <el-col :span="8" :offset="8">
     <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="formLabelAlign"
            :rules="rules"
            ref="formLabelAlign"
          >
            <el-form-item label="添加属性" size="medium">
        <i class="el-icon-circle-plus-outline"></i>
            </el-form-item >
            <el-form-item label="属性id" prop="id">
              <el-input
                v-model="formLabelAlign.id" 
                  :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="属性名称" prop="name">
              <el-input
                v-model="formLabelAlign.name"
                placeholder="例：颜色 （衣服的颜色为产品的属性）"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit__('formLabelAlign')"
                >确认添加</el-button
              >
            </el-form-item>
          </el-form>
          </el-col>        
          <el-col :span="8"></el-col>
          </el-row>
   </div>

   <!--修改产品数据-->
    <el-dialog title="编辑产品" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="产品id" :label-width="formLabelWidth">
      <el-input v-model="form.id" :disabled="true"  autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="产品名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="update__">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      id: 0,
      zid: 0,
      total: 0,
      rules: {
        name: [
          {
            required: true,
            message: "输入产品详细名称不能为空",
            trigger: "blur"
          }
        ]
      },
      tableData: [
        {
          id: 0,
          name: ""
        }
      ],
      // 属性数据修改
      form: {
        id: 0,
        name: ""
        // createDate: ""
      },
      dialogFormVisible: false, //控制修改产品的弹出表单
      formLabelWidth: "120px", //控制修改产品的弹出宽度
      labelPosition: "right",
      formLabelAlign: {
        id: null,
        name: ""
      }
    };
  },
  mounted() {
    // 获取路由参数
    this.zid = this.$route.query.zid;
    this.id = this.$route.query.id;
    this.list();
  },
  methods: {
    list() {
      const thiz = this;
      thiz.$axios
        .get("/alter/property/list?id=" + thiz.id + "&start=0")
        .then(res => {
          this.tableData = res.data.data.content;
          window.console.log(" this.tableData this.tableData", this.tableData);
        });
    },
    delete__(row) {
      const thiz = this;
      this.$confirm("此操作将永久删除该属性以及属性值, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          thiz.$axios.get("/alter/property/delete?id=" + row.id).then(res => {
            window.console.log(res);
            if (res.data.flag == true) {
              thiz.$message({
                type: "success",
                message: "产品删除成功!"
              });
              for(let i=0;i<thiz.tableData.length;i++){
                if(thiz.tableData[i]==row){
                  thiz.tableData.splice(i,1)
                }
              }
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
    updateProperty(params) {
      const thiz = this;
      window.console.log(params);
      this.dialogFormVisible = true;
      thiz.form = params;
    },
    update__() {
      const thiz = this;
      thiz.$axios
        .post("/alter/property/update", thiz.form)
        .then(res => {
          window.console.log(res);
          if (res.data.flag == true) {
            thiz.$message({
              type: "success",
              message: "属性修改成功!"
            });
          }
        })
        .catch(() => {
          thiz.$message.error("属性修改失败");
        });
      this.dialogFormVisible = false;
    },
    handleCurrentChange(start) {
      const thiz = this;
      thiz.$axios
        .get("/alter/property/list?id=" + thiz.id + "&start=" + (start - 1))
        .then(res => {
          thiz.total = res.data.data.totalElements;
          thiz.tableData = res.data.data.content;
          for (let i = 0; i < this.productList.length; i++) {
            this.productList[i].createDate = moment(
              this.productList[i].createDate
            ).format("YYYY-MM-DD");
          }
        });
    },
    tableRowClassName({ row, rowIndex }) {
      window.console.log(row);
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    onSubmit__(formName) {
      const thiz = this;
      thiz.$refs[formName].validate(valid => {
        if (valid) {
          thiz.$axios
            .post("/alter/property/add?id=" + thiz.id, this.formLabelAlign)
            .then(res => {
              if (res.data.flag == true) {
                thiz.$message({
                  type: "success",
                  message: "属性新增成功!"
                });
                thiz.tableData.unshift(res.data.data);
              }
            });
        }
      });
    }
  }
};
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
