<template>
  <el-drawer
    title="批注历史"
    @close="close"
    :visible.sync="historyVisible"
    size="40%"
  >
    <el-timeline>
    <el-timeline-item timestamp="2018/4/12" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/12 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/3" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
  </el-drawer>
</template>

<script>
export default {
  props: {
    historyVisible: Boolean,
    historyoff__: Function,
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
    };
  },
  mounted() {
  },
  methods: {
   onHistory(id){
      this.$store.dispatch("leave/listhistory", { id: id });
   },

    addOff__() {
      this.historyoff__();
    },
    close() {
      this.historyoff__();
    },
  },
};
</script>
