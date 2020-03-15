<template>
  <div>
      <div v-for="(item, index) in cpy" :key="index">
<div class="demo-input-suffix">
{{ item.cproperty.name}}
  <el-input
    suffix-icon="el-icon-date"
    v-model="item.value" @change="update__(item)">
  </el-input>
</div>

</div>

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
