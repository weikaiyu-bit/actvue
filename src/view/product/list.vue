<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/power' }">{{this.$route.query.cname}}</el-breadcrumb-item>
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
        </el-col>
      </el-row>
    </div>
    <el-table :data="productList" :highlight-current-row="true">
      <el-table-column prop="id" label="id"> </el-table-column>

      <el-table-column label="图片">
        <template>
          <el-image url="/">
          
          </el-image>
        </template>
      </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        prop="name"
        label="产品名称"
      >
      </el-table-column>
      <el-table-column prop="subTitle" label="产品标题"> </el-table-column>
      <el-table-column prop="originalPrice" label="原始价格"> </el-table-column>
      <el-table-column prop="promotePrice" label="优惠价格"> </el-table-column>
      <el-table-column prop="stock" label="库存"> </el-table-column>
      <el-table-column prop="createDate" label="创建时间"> </el-table-column>
      <el-table-column label="图片管理">
        <template slot-scope="scope">
          <el-link target="_blank">
            <i class="el-icon-picture-outline" @click="image__(scope.row)" ></i
          ></el-link>
        </template>
      </el-table-column>

      <el-table-column label="添加属性">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="property__(scope.row)"
            >
                <i class="el-icon-folder-add"></i></el-button
          >
        </template>
      </el-table-column>

      <el-table-column label="编辑产品">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="get__(scope.row)">
            <i class="el-icon-edit"></i>
          </el-button>
        </template>
      </el-table-column>

      <el-table-column label="分类删除">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="delete__(scope.row.id)"
            >
            <i class="el-icon-delete"></i>
            </el-button
          >
        </template>
      </el-table-column>
    </el-table>
  
      <el-pagination background :page-size="5"    @current-change="handleCurrentChange"    :total="this.total"> </el-pagination>


    <div style="text-algin:center">
  <el-row>
        <el-col :span="7"></el-col>
         <el-col :span="9" :offset="7">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="formLabelAlign"
            :rules="rules"
            ref="formLabelAlign"
          >
            <el-form-item label="添加产品" size="medium">
        <i class="el-icon-circle-plus-outline"></i>
            </el-form-item >
            <el-form-item label="产品名称" prop="name">
              <el-input
                v-model="formLabelAlign.name"
                placeholder="比如：六必居 榨菜 咸菜下饭方便小菜 70g*5袋 中华老字号"
              ></el-input>
            </el-form-item>
            <el-form-item label="产品标题" prop="subTitle">
              <el-input
                v-model="formLabelAlign.subTitle"
                placeholder="比如：六必居 榨菜"
              ></el-input>
            </el-form-item>
            <el-form-item label="原始价格" prop="originalPrice">
              <el-input
                v-model="formLabelAlign.originalPrice"
                placeholder="19.90"
              ></el-input>
            </el-form-item>
            <el-form-item label="优惠价格" prop="promotePrice">
              <el-input
                v-model="formLabelAlign.promotePrice"
                placeholder="9.90"
              ></el-input>
            </el-form-item>
            <el-form-item label="库存" prop="stock  ">
              <el-input
                v-model="formLabelAlign.stock"
                placeholder="26"
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
<!--修改产品数据-->
    <el-dialog title="编辑产品" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="产品id" :label-width="formLabelWidth">
      <el-input v-model="form.id" :disabled="true"  autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="产品名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="产品标题" :label-width="formLabelWidth">
      <el-input v-model="form.subTitle" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="产品原价格" :label-width="formLabelWidth">
      <el-input v-model="form.originalPrice" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="优惠价格" :label-width="formLabelWidth">
      <el-input v-model="form.promotePrice" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth">
      <el-input v-model="form.stock" autocomplete="off"></el-input>
    </el-form-item>
    <!--
     <el-form-item label="产品创建时间" :label-width="formLabelWidth">
     <el-input v-model="createDate" :disabled="true" autocomplete="off"></el-input>
     </el-form-item>
    -->

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
      //新增产品表单数据
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        subTitle: "",
        originalPrice: "",
        promotePrice: "",
        stock: ""
      },
      dialogFormVisible: false, //控制修改产品的弹出表单
      formLabelWidth: "120px", //控制修改产品的弹出宽度
      // 产品修改数据
      form: {
        id: 0,
        name: "",
        subTitle: "",
        originalPrice: "",
        promotePrice: "",
        stock: ""
        // createDate: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "输入产品详细名称不能为空",
            trigger: "blur"
          }
        ],
        subTitle: [
          { required: true, message: "输入标题不能为空", trigger: "blur" }
        ],
        originalPrice: [
          { required: true, message: "输入价格不能为空", trigger: "blur" }
        ],
        promotePrice: [
          { required: true, message: "输入价格不能为空", trigger: "blur" }
        ],
        stock: [
          { required: true, message: "输入库存不能为空", trigger: "blur" }
        ]
      },
      productList: [
        {
          id: 1,
          name: "王小虎",
          subTitle: "是的",
          originalPrice: "19.9",
          promotePrice: "39.9",
          stock: "99",
          createDate: ""
        }
      ],
      total: 0,
      id: 0,
      input2: ""
    };
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
  },
  mounted() {
    this.list();
  },
  methods: {
    get__(row) {
      const thiz = this;
      thiz.dialogFormVisible = true;
      thiz.form = row;
    },
    update__() {
      const thiz = this;
      thiz.dialogFormVisible = false;
      window.console.log("this.form", thiz.form);
      thiz.$axios.post("/alter/product/update", thiz.form).then(res => {
        // thiz.form = res.data.data;
        window.console.log(res.data.data);
      });
    },
    delete__(id) {
      const thiz = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          thiz.$axios
            .get("/alter/product/delete?id=" + id)
            .then(res => {
              window.console.log(res);
              if (res.data.flag == true) {
                thiz.$message({
                  type: "success",
                  message: "产品删除成功!"
                });
                thiz.formLabelAlign = {};
                thiz.list();
              }else{
                    this.$message.error(res.data);  
              }
            })

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
      this.id = thiz.$route.query.id;
      thiz.$axios
        .get("/alter/product/list?id=" + thiz.id + "&start=" + 0)
        .then(res => {
          thiz.productList = res.data.data.content;
          thiz.total = res.data.data.totalElements;
          window.console.log(" thiz.total = res.data.data.totalElements;",   res.data.data.totalElements)
          for (let i = 0; i < this.productList.length; i++) {
            this.productList[i].createDate = moment(
              this.productList[i].createDate
            ).format("YYYY-MM-DD");
          }
        });
    },
    onSubmit__(formName) {
      const thiz = this;
      thiz.$refs[formName].validate(valid => {
        if (valid) {
          thiz.$axios
            .post("/alter/product/add?id=" + thiz.id, this.formLabelAlign)
            .then(res => {
              if (res.data.flag == true) {
                thiz.$message({
                  type: "success",
                  message: "产品新增成功!"
                });
                thiz.formLabelAlign = {};
                thiz.list();
              }
            });
        }
      });
    },
    handleClick(row) {
      window.console.log(row);
    },
    property__(row) {
      const thiz = this;
      // 路由query传参
      thiz.$router.push({ name: "property", query: { cname:thiz.$route.query.cname, pname:row.subTitle, zid: thiz.id, id: row.id } });
    },
    handleCurrentChange(start) {
      const thiz = this;
      thiz.$axios
        .get("/alter/product/list?id=" + thiz.id + "&start=" + (start - 1))
        .then(res => {
          thiz.productList = res.data.data.content;
          thiz.total = res.data.data.totalElements;
          for (let i = 0; i < this.productList.length; i++) {
            this.productList[i].createDate = moment(
              this.productList[i].createDate
            ).format("YYYY-MM-DD");
          }
        });
    },
    image__(row) {
      const thiz = this;   thiz.$router.push({ name: "image", query: { cname:thiz.$route.query.cname, pname:row.subTitle, zid: thiz.id, id: row.id } });
   
    }
  }
};
</script>
<style scoped>
#app {
}
#hidetwo {
  /* 超出两行裁剪 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
