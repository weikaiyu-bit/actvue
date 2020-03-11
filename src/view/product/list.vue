<template>
<div>

<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/power' }">分类管理</el-breadcrumb-item>
  <el-breadcrumb-item>产品管理</el-breadcrumb-item>
</el-breadcrumb>



    <el-table :data="productList">

      <el-table-column prop="id" label="id"> </el-table-column>

      <el-table-column  label="图片" >
      <template >
      <el-image url="/"></el-image>
      </template>
      </el-table-column>

      <el-table-column :show-overflow-tooltip="true" prop="name" label="产品名称" > </el-table-column>
      <el-table-column prop="subTitle" label="产品小标题" > </el-table-column>
      <el-table-column prop="originalPrice" label="原始价格" > </el-table-column>
      <el-table-column prop="promotePrice" label="优惠价格" > </el-table-column>
      <el-table-column prop="stock" label="库存" > </el-table-column>
      <el-table-column label="图片管理" > 
       <template >
      <el-link href="/welcome" target="_blank"> <i class="el-icon-picture-outline"></i></el-link>
      </template>
      </el-table-column>

      <el-table-column label="设置属性" >
       <template slot-scope="scope">
        <el-button type="text" size="small" @click="click__(scope.row.id)">设置</el-button>
      </template>
      </el-table-column>

      <el-table-column label="编辑产品" >
       <template slot-scope="scope">
        <el-button type="text" size="small" @click="click__(scope.row.id)">编辑</el-button>
      </template>
      </el-table-column>

      <el-table-column label="分类删除" >
      <template >
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div style="text-align:center">
<el-pagination background layout="prev, pager, next"    @current-change="handleCurrentChange" :total="total">
</el-pagination>
    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
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
      total:0,
      id: 0
    };
  },
  mounted() {
    const thiz = this;
    this.id = thiz.$route.query.id;
    thiz.$axios
      .get("/alter/product/list?id=" + thiz.id + "&start=" + 0)
      .then(res => {
        thiz.productList = res.data.data.content;
       thiz.total=res.data.data.totalElements;

      });
  },
  methods: {
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
