<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/power' }">{{ this.$route.query.cname}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{  path:  '/productlist?id=' + this.$route.query.zid + '&cname=' + this.$route.query.cname  }" >{{ this.$route.query.pname }}</el-breadcrumb-item  >
    
      <el-breadcrumb-item :to="{ path: '/property?id=' + this.$route.query.pid + '&cname=' + this.$route.query.cname +'&pname='+this.$route.query.pname+'&zid='+this.$route.query.zid }">{{this.$route.query.pvname}}</el-breadcrumb-item>
      <el-breadcrumb-item>属性值</el-breadcrumb-item>
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
  
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="value" label="属性值名称"> </el-table-column>
      <el-table-column prop="price" label="属性价格"> </el-table-column>

      <el-table-column label="编辑属性值">
        <template slot-scope="scope">
          <el-button
            @click="updateProperty(scope.row)"
            type="text"
            size="small"
          >
            <i class="el-icon-edit"></i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除属性值">
        <template slot-scope="scope">
          <el-button @click="delete__(scope.row)" type="text" size="small">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination background :page-size="5"    @current-change="handleCurrentChange"    :total="this.total"></el-pagination> 
 


 <!--修改产品数据-->
    <el-dialog title="编辑属性值" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="属性值id" :label-width="formLabelWidth">
      <el-input v-model="form.id" :disabled="true"  autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="属性值名称" :label-width="formLabelWidth">
      <el-input v-model="form.value" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="属性值价格" :label-width="formLabelWidth">
      <el-input v-model="form.price" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="update__">确 定</el-button>
  </div>
</el-dialog>
   <div style="text-algin:center">
  <el-row>
        <el-col :span="7"></el-col>
         <el-col :span="9" :offset="7">
     <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="formLabelAlign"
            :rules="rules2"
            ref="formLabelAlign"
          >
            <el-form-item label="添加属性值" size="medium">
        <i class="el-icon-circle-plus-outline"></i>
            </el-form-item >
            <el-form-item label="属性值id" prop="id">
              <el-input
                v-model="formLabelAlign.id" 
                  :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="属性值名称" prop="name">
              <el-input
                v-model="formLabelAlign.value"
                placeholder="例：37码 -->鞋子(产品)->尺码(属性)->37码(属性值)"
              ></el-input>
            </el-form-item>
            <el-form-item label="属性价格" prop="name">
              <el-input
                v-model="formLabelAlign.price"
                placeholder=""
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit__('formLabelAlign')"
                >确认添加</el-button
              >
            </el-form-item>
          </el-form>
          </el-col>        
          <el-col :span="7"></el-col>
          </el-row>
   </div>


  </div>
</template>
<script>
export default {
  data() {
    return {
      zid: 0,
      id: 0,
      total: 0,
      input2: "",
      rules2: {
        value: [
          {
            required: true,
            message: "请输入您的帐户",
            trigger: "blur"
          }
        ],

      },
      tableData: [
        {
          id: 0,
          value: "",
          price:0
        }
      ],
      dialogFormVisible: false, //控制编辑属性值
      formLabelWidth: "120px", //控制修改产品的弹出宽度
      // 属性值数据修改
      form: {
        id: 0,
        value: "",
        price: ""
        // createDate: ""
      },
      labelPosition: "right",
      formLabelAlign: {
        id: null,
        name: ""
      }
    };
  },
  mounted() {
    this.zid = this.$route.query.zid;
    this.id = this.$route.query.id;
    //  thiz.$router.push({ name: "propertyValue", query: { cname:thiz.$route.query.cname, pname:row.subTitle, zid: thiz.id, id: row.id ,pvname:row.name} });
    window.console.log("this.$route.query.cname", this.$route.query.cname);
    window.console.log("this.$route.query.pname", this.$route.query.pname);
    window.console.log("this.$route.query.pvname", this.$route.query.pvname);
    window.console.log("zid", this.$route.query.zid);
    window.console.log("id", this.$route.query.id);
    window.console.log("pid", this.$route.query.pid);

    this.list();
  },
  methods: {
    list() {
      const thiz = this;
      thiz.$axios
        .get("/alter/propertyValue/list?id=" + thiz.id + "&start=" + 0)
        .then(res => {
          thiz.total = res.data.data.totalElements;
          this.tableData = res.data.data.content;
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    // 添加属性
    onSubmit__(formName) {
      const thiz = this;
      thiz.$refs[formName].validate(valid => {
        if (valid) {
         window. console.log("v....",valid)
          thiz.$axios
            .post("/alter/propertyValue/add?id=" + thiz.id, thiz.formLabelAlign)
            .then(res => {
              if (res.data.flag == true) {
                thiz.$message({
                  type: "success",
                  message: "属性新增成功!"
                });
                thiz.tableData.unshift(res.data.data);
                thiz.formLabelAlign={id: null,name: ""}
              }
            });
        }
      });
    },
    // 编辑属性值
    updateProperty(row) {
      window.console.log(row);
      const thiz = this;
      thiz.dialogFormVisible = true;
      this.form = row;
    },

    handleCurrentChange(start) {
      const thiz = this;
      thiz.$axios
        .get(
          "/alter/propertyValue/list?id=" + thiz.id + "&start=" + (start - 1)
        )
        .then(res => {
          thiz.productList = res.data.data.content;
          thiz.total = res.data.data.totalElements;
        });
    },
    update__() {
      const thiz = this;
      thiz.dialogFormVisible = false;
      window.console.log("this.form", thiz.form);
      thiz.$axios
        .post("/alter/propertyValue/update", thiz.form)
        .then(res => {
          if (res.data.flag) {
            thiz.$message({
              type: "success",
              message: "属性值修改成功"
            });
          }
        })
        .catch(() => {
          thiz.$message.error("属性值修改失败");
        });
    },
    // 删除属性值
    delete__(row){
      const thiz = this;
      this.$confirm("此操作将永久删除该属性值, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          thiz.$axios.get("/alter/propertyValue/delete?id="+row.id).then(res => {
            window.console.log(res);
            if (res.data.flag == true) {
              thiz.$message({
                type: "success",
                message: "属性值删除成功!"
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
    tableRowClassName({ row, rowIndex }) {
      window.console.log(row);
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  }
};
</script>
