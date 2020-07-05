<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="角色名称">
      <el-input
        v-model="formInline.role"
        placeholder="请输入角色名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input
        v-model="formInline.description"
        placeholder="请输入备注"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        description: "",
        role: "",
      },
    };
  },
  methods: {
    onSubmit() {},
  },
};
</script>
