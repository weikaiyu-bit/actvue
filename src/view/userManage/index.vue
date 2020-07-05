<template>
  <div>
    <el-card class="box-card">
      <SearchBar />
    </el-card>

    <el-card class="box-card">
      <el-table :data="userData" stripe style="width: 100%">
        <el-table-column prop="id" label="序号"> </el-table-column>
        <el-table-column prop="userName" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="roleDescription" label="角色备注" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip content="配置角色" placement="top">
              <el-button
                type="text"
                size="small"
                @click="configRole(scope.row)"
              >
                配置角色
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

    <el-dialog title="配置角色" :visible.sync="dialogFormVisible">
      <el-checkbox-group v-model="checkList">
        <el-checkbox :label="role.id" v-for="role in roleData" :key="role.id">{{
          role.name
        }}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitRole" :loading="buttonLoading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SearchBar from "./components/searchBar.vue";
export default {
  data() {
    return {
      dialogFormVisible: false,
      id: "",
      form: {
        name: "",
      },
      checkList: [],
      buttonLoading: false,
    };
  },
  components: {
    SearchBar,
  },
  computed: {
    ...mapState({
      userData: (state) => state.user.userData,
      roleData: (state) => state.role.roleData,
    }),
  },
  mounted() {
    this.list();
  },
  methods: {
    onSubmitRole() {
      this.buttonLoading = true;
      this.$store
        .dispatch("user/addRole", {
          ids: this.checkList,
          id: this.id,
        })
        .then((res) => {
          if (res.flag == true) {
            this.buttonLoading = false;
            this.dialogFormVisible = false;
            this.$store.dispatch("user/findPage").then(() => {
              this.$message({ message: "角色配置成功", type: "success" });
            });
          } else {
            this.buttonLoading = false;
            this.dialogFormVisible = false;
            this.$message.error("角色配置失败");
          }
        })
        .catch((err) => {
          this.buttonLoading = false;
          this.dialogFormVisible = false;
          this.$message.error("角色配置失败" + err);
        });
    },
    configRole(item) {
      this.checkList = [];
      this.id = item.id;
      if (this.roleData) {
        this.$store.dispatch("role/findPage").then((res) => {
          let arrayId =
            item.roleDescriptionId !== null
              ? item.roleDescriptionId.split(",")
              : "";
          if (arrayId.length != 0) {
            for (let id in arrayId) {
              for (let roleid in res.data) {
                if (parseInt(arrayId[id]) == res.data[roleid].id) {
                  this.checkList.push(res.data[roleid].id);
                }
              }
            }
          }
        });
      }
      this.dialogFormVisible = true;
      this.form = item;
    },
    list() {
      this.$store.dispatch("user/findPage");
    },
  },
};
</script>
