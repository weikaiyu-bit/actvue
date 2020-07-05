<template>
  <div>
    <el-card class="box-card">
      <SearchBar />
    </el-card>

    <el-card class="box-card">
      <el-table :data="roleData" stripe style="width: 100%">
        <el-table-column prop="id" label="序号"> </el-table-column>
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              content="启动请假流程"
              placement="top"
              v-if="scope.row.status == '0'"
            >
              <el-button type="text" size="small" @click="onRun(scope.row.id)">
                <i class="el-icon-video-play"></i>
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip content="删除请假单" placement="top">
              <el-button
                type="text"
                size="small"
                @click="delete__(scope.row.id)"
              >
                <i class="el-icon-delete" @click="delete__(scope.row.id)"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SearchBar from "./components/searchBar.vue";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  components: {
    SearchBar,
  },
  computed: {
    ...mapState({
      roleData: (state) => state.role.roleData,
    }),
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      this.$store.dispatch("role/findPage").then((res) => {
        console.log("res", res);
      });
    },
  },
};
</script>
