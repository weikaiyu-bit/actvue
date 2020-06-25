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
    dialogVisible: Boolean,
    off__: Function,
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
        status: "0", //提交审核 0      审核中 1
        name: window.localStorage.getItem("name"),
        userId: window.localStorage.getItem("id"),
      },
      record: {},
    };
  },
  mounted() {},
  methods: {

    onRecord(record) {
      this.record = record;
      console.log("???",this.record)
    },

    add__() {
      const thiz = this;
      const id = window.localStorage.getItem("id");
      this.formLabelAlign.days = parseFloat(this.formLabelAlign.days);
      this.formLabelAlign.userId = parseInt(this.formLabelAlign.userId);
      this.$store
        .dispatch("leave/leaveAdd", this.formLabelAlign)
        .then((res) => {
          switch (res.code) {
            case "SUCCESS":
              thiz.$message({
                message: "请假单填写成功",
                type: "success",
              });
              thiz.close();
              thiz.$store.dispatch("leave/findPage", { id: id });
              break;
            case "FAIL":
              thiz.$message.error("错了哦，这是一条错误消息");
              thiz.close();
              break;
          }
        });
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
