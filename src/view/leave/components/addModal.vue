<template>
  <el-dialog
    title="填写请假单"
    @close="close"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <el-form-item label="请假原因">
        <el-input v-model="formLabelAlign.reason"></el-input>
      </el-form-item>
      <el-form-item label="请假描述">
        <el-input v-model="formLabelAlign.remarks"></el-input>
      </el-form-item>
      <el-form-item label="请假天数">
        <el-input type="number" v-model="formLabelAlign.days"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addOff__">取 消</el-button>
      <el-button type="primary" @click="add__">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {},
    off__: {},
  },

  data() {
    /**
     * 请假状态值：
     * 审核中 1
     */
    return {
      labelPosition: "right",
      formLabelAlign: {
        reason: "",
        remarks: "",
        days: "",
        status: 1,
      },
    };
  },
  mounted() {},
  methods: {
    add__() {
        this.$store.dispatch("leave/leaveAdd",this.formLabelAlign).then(res=>{
            console.log("页面拿到了数据",res)
        })
    },

    addOff__() {
      this.off__();
    },
    close() {
      this.off__();
    },
  },
};
</script>
