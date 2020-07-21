<template>
  <el-drawer title="批注历史" @close="close" :visible.sync="historyVisible" size="40%">
    <el-card>
    <el-timeline :reverse="true">
      <el-timeline-item :icon="el-icon-more" color="#0bbd87" :timestamp="history.startTime" placement="top" v-for="(history,index) in historyData" :key="index">
        <el-card>
          <h4 v-if="index==0" :class="{startStyle:true}">{{history.assignee}}{{history.activityName}}</h4>
          <h4 v-else-if="index!=0&&index!=historyData.length-1">{{history.assignee}}{{history.activityName}}</h4>
          <h4 v-else-if="index==historyData.length-1" :class="{endStyle:true}">{{history.assignee}}{{history.activityName}}</h4>
          <p>{{history.assignee}} 提交于 {{history.endTime}}</p>
        </el-card>
        
      </el-timeline-item>
    </el-timeline>
    </el-card>
  </el-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    historyVisible: Boolean,
    historyoff__: Function
  },
  computed: {
    ...mapState({
      historyData: state => state.leave.historyData
    })
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
        userId: window.localStorage.getItem("id")
      }
    };
  },
  mounted() {},
  methods: {
    onHistory(id) {
      this.$store.dispatch("leave/listhistory", { id: id });
    },

    addOff__() {
      this.historyoff__();
    },
    close() {
      this.historyoff__();
    }
  }
};
</script>
<style scoped>
.startStyle{
  color:green
}
.endStyle{
  color: brown;
}
</style>
