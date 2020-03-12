<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/power' }">分类管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/productlist?id='+this.zid }">产品管理</el-breadcrumb-item>
      <el-breadcrumb-item>图片管理</el-breadcrumb-item>
    </el-breadcrumb>
  <div style="margin-top:10px;">
  <el-row :gutter="20">
  <el-col :span="12">
    <el-upload
  class="upload-demo"
  accept="image/jpeg,image/jpg,image/png"
  :action="url.wpurl"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
   multiple
   name="files"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </el-col>




  </el-row>
  </div>

  </div>
</template>


<script>
export default {
  data() {
    return {
      zid: 0,
      id:0,
      url:{wpurl:'http://localhost:8001/alter/product/images?id='+this.id+'&type=wpimage',dturl:'/alter/product/images?id='+this.id+'&type=dtimage'},
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  mounted() {
    this.zid = this.$route.query.zid;
    this.id = this.$route.query.id;
    window.console.log(this.id)
  },
  methods: {
    handleRemove(file, fileList) {
      window.console.log(file, fileList);
    },
    handlePreview(file) {
      window.console.log(file);
    },
    // httpRequest(file){
    //   const thiz=this;    window.console.log('aaaaaaaaaaaaaaaa')
    //     let fd=new FormData();
    //     fd.append('files',file);
    //     this.$axios.post(thiz.url.wpurl,fd).then(res=>{
    //       window.console.log(res)
    //     })
    // }
  }
};
</script>

<style>
</style>
