<template>
  <div>
    <el-row>
    <el-col :span="4"></el-col>
    <el-col :span="8" offset="4">
<tr  v-for="(item, index) in cpy" :key="index">
  <td>{{ item.cproperty.name}}</td>
  <td>
      <el-input
    suffix-icon="el-icon-date"
    style="width:300px;"
    v-model="item.value" @change="update__(item)">
  </el-input>
  </td>
</tr>
    </el-col>
    <el-col :span="4"></el-col>
    </el-row>


  </div>
</template>
<script>
export default {
  data() {
    return {
      cpy: [],
      item: {}
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    const thiz = this;
    thiz.$axios
      .get("/alter/products/cpropertyValues?id=" + thiz.id)
      .then(res => {
        this.cpy = res.data;
      });
  },
  methods: {
      update__(bean){
        const thiz = this;
    thiz.$axios 
      .post("/alter/cpropertyValues/update",bean)
      .then(res => {
        if(res.data.flag==true){
          this.$message({
            type:'success',
            message:'修改成功'
          })
        }
        window.console.log("res.datares.data", res.data);
      });    

      }
  }
};
</script>
<style scoped>
body {
  background-color: darkgray;
}

</style>
