<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/power' }">{{this.$route.query.cname}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/productlist?id='+this.zid +'&cname='+this.$route.query.cname}">{{this.$route.query.pname}}</el-breadcrumb-item>
      <el-breadcrumb-item>图片管理</el-breadcrumb-item>
    </el-breadcrumb>
  <div style="margin-top:10px;">
  <el-row :gutter="20" >
  <el-col :span="8">
    <el-upload
  class="upload-demo"
  accept="image/jpeg,image/jpg,image/png"
  :action="'http://localhost:8001/alter/product/images?id='+id+'&name=wpimage'"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
   multiple
   name="files"
  :file-list="wpimage"
  :on-success="handleSuccess"
  list-type="picture">
  <el-button size="small" type="primary">轮播图上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </el-col>



  <el-col :span="8">
    <el-upload
  class="upload-demo"
  accept="image/jpeg,image/jpg,image/png"
  :action="'http://localhost:8001/alter/product/images?id='+id+'&name=dtimage'"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
   multiple
  :on-success="handleSuccess"
   name="files"
  :file-list="dtimage"
  list-type="picture">
  <el-button size="small" type="primary">产品详情图上传</el-button>
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
      id: 0,
      url: {
        wpurl:
          "http://localhost:8001/alter/product/images?id=" +
          this.id +
          "&type=wpimage",
        dturl: "/alter/product/images?id=" + this.id + "&type=dtimage"
      },
      wpimage: [], //详情图片
      dtimage: [] //轮播图片
    };
  },
  mounted() {
    this.zid = this.$route.query.zid;
    this.id = this.$route.query.id;
    this.wpimage__();
    this.dtimage__();
  },
  methods: {
    wpimage__() {
      const thiz = this;
      this.$axios
        .get("/alter/product/listImage?name=wpimage&id=" + thiz.id)
        .then(res => {
          window.console.log(res);
          thiz.wpimage = [];
          for (let i = 0; i < res.data.length; i++) {
            let image = {
              name: res.data[i].id,
              url:
                "http://localhost:8001/static/img/productwpimage/" +
                res.data[i].id +
                ".jpg"
            };
            thiz.wpimage.push(image);
          }
        });
    },
    dtimage__() {
      const thiz = this;
      this.$axios
        .get("/alter/product/listImage?name=dtimage&id=" + thiz.id)
        .then(res => {
          thiz.dtimage = [];
          for (let i = 0; i < res.data.length; i++) {
            let image = {
              name: res.data[i].id,
              url:
                "http://localhost:8001/static/img/productdtimage/" +
                res.data[i].id +
                ".jpg"
            };
            thiz.dtimage.push(image);
          }
        });
    },

    handleRemove(file, fileList) {
      window.console.log("file::", file);
      window.console.log("fileList::", fileList);
      const thiz = this;
      thiz.$axios.get("/alter/product/deleteImage/" + file.name).then(res => {
        if (res.data.flag) {
          this.$message({
            type: "warning",
            message: "图片删除成功"
          });
        }
      });
    },
    handlePreview(file) {
      window.location.href = file.url;
    },
    handleSuccess(res) {
      this.$message({
        type: "success",
        message: "图片上传成功"
      });
      if (res.name === "wpimage") {
        this.wpimage__();
      } else {
        this.dtimage__();
      }
    }
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
