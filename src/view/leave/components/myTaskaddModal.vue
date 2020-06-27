<template>
  <el-drawer
    title="请假审批"
    @close="close"
    :visible.sync="dialogVisible"
    size="60%"
  >
    <el-divider content-position="left">请假信息</el-divider>

    <el-form :label-position="labelPosition" label-width="80px" :model="leave">
      <el-form-item label="请假人：">
        <!-- <el-input v-model="formLabelAlign.remarks"></el-input> -->
        <span>{{ leave.name }}</span>
      </el-form-item>
      <el-form-item label="请假天数：">
        <span>{{ leave.days }}</span>
      </el-form-item>
      <el-form-item label="请假原因：">
        <span>{{ leave.reason }}</span>
      </el-form-item>

      <el-form-item label="请假批注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          v-model="outome"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="6" :offset="20">
          <el-button
            v-for="(item, index) in outgoingFlows"
            :key="index"
            type="primary"
            round
            @click="completeTask(leave, item.name)"
            >{{ item.name }}</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left">批注流程</el-divider>
    <el-table :data="processInstanceComments">
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="fullMessage" label="批注信息"> </el-table-column>
      <el-table-column prop="name" label="处理人"> </el-table-column>
      <el-table-column prop="time" label="处理时间"> </el-table-column>
    </el-table>

    <span slot="footer" class="dialog-footer">
      <el-button @click="addOff__">取 消</el-button>
      <el-button type="primary" @click="add__">确 定</el-button>
    </span>
  </el-drawer>
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
      },
      record: {},
      leave: [], //用户请假信息
      outgoingFlows: [], //连线信息
      outome:''
    };
  },
  mounted() {},
  methods: {
    /**
     * 完成任务
     * 1、批注信息
     * 2、请假单id
     * 3、taskid
     * 4、流程走向信息
     */
    completeTask(params, name) {
      const data = { leaveId: params.id, taskId: this.record.id, comments: name,outome:this.outome };
      this.$store.dispatch("leave/completeTask", data).then((res) => {
        console.log("resresresresresresres", res);
      });
    },

    onRecord(record) {
      this.record = record;
      this.$store.dispatch("leave/listinfo", record).then((res) => {
        this.leave = res.data.leave;
        this.outgoingFlows = res.data.outgoingFlows;
        this.processInstanceComments = res.data.processInstanceComments;
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
