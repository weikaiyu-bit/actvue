<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/power' }">分类管理</el-breadcrumb-item>
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
          <el-button type="primary">新增产品</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="productList">
      <el-table-column prop="id" label="id"> </el-table-column>

      <el-table-column label="图片">
        <template>
          <el-image url="/"></el-image>
        </template>
      </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        prop="name"
        label="产品名称"
      >
      </el-table-column>
      <el-table-column prop="subTitle" label="产品小标题"> </el-table-column>
      <el-table-column prop="originalPrice" label="原始价格"> </el-table-column>
      <el-table-column prop="promotePrice" label="优惠价格"> </el-table-column>
      <el-table-column prop="stock" label="库存"> </el-table-column>
      <el-table-column label="图片管理">
        <template>
          <el-link href="/welcome" target="_blank">
            <i class="el-icon-picture-outline"></i
          ></el-link>
        </template>
      </el-table-column>

      <el-table-column label="设置属性">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="click__(scope.row.id)"
            >设置</el-button
          >
        </template>
      </el-table-column>

      <el-table-column label="编辑产品">
        <template>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>

      <el-table-column label="分类删除">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="delete__(scope.row.id)"
            >删除</el-button
          >
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
            <el-form-item label="产品名称" prop="name">
              <el-input
                v-model="formLabelAlign.name"
                placeholder="比如：六必居 榨菜 咸菜下饭方便小菜 70g*5袋 中华老字号"
              ></el-input>
            </el-form-item>
            <el-form-item label="产品小标题" prop="subTitle">
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
        <el-col :span="8"></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
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
  mounted() {
    this.list();
  },
  methods: {
    delete__(id) {
      const thiz = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
       thiz.$axios.get("/alter/product/delete?id=" + id).then(res => {
        window.console.log(res);
        if (res.data.flag == true) {
          thiz.$message({
            type: "success",
            message: "产品删除成功!"
          });
          thiz.formLabelAlign = {};
          thiz.list();
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
      this.id = thiz.$route.query.id;
      window.console.log("this.id", this.id);
      thiz.$axios
        .get("/alter/product/list?id=" + thiz.id + "&start=" + 0)
        .then(res => {
          thiz.productList = res.data.data.content;
          thiz.total = res.data.data.totalElements;
        });
    },
    onSubmit__(formName) {
      const thiz = this;
      thiz.$refs[formName].validate(valid => {
        if (valid) {
          const category = { category: { id: parseInt(thiz.id) } };
          const formdata = { ...this.formLabelAlign, ...category };
          window.console.log("???", formdata);
          thiz.$axios.post("/alter/product/add", formdata).then(res => {
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
    click__(index) {
      const thiz = this;
      thiz.$router.push({ name: "productlist", query: { index } });
    },
    handleCurrentChange(start) {
      const thiz = this;
      thiz.$axios
        .get("/alter/product/list?id=" + thiz.id + "&start=" + (start - 1))
        .then(res => {
          thiz.productList = res.data.data.content;
        });
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
