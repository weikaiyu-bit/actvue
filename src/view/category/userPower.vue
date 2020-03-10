<template>
    <el-table :data="tableData">
      <el-table-column
        prop="id"
        label="id"
       >
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
       >
      </el-table-column>
      <el-table-column
      label="产品管理"
      >
       <template >
        <el-button type="text" size="small">编辑</el-button>
      </template>
      </el-table-column>
      <el-table-column
      label="产品管理"
      >
      <template >
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
      <el-table-column
      label="编辑"
      >
      <template >
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
          id: '2016-05-02',
          name: '王小虎',
        }]
      }
    },
    mounted(){
        const thiz=this;
        thiz.$axios("/category/list").then(res=>{
         thiz.tableData= res.data.data;
        })
    },
    methods: {
      handleClick(row) {
      window.  console.log(row);
      }
    },


  }
</script>
<style scoped>
#app {
}
</style>