<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/power' }">{{ this.$route.query.cname}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{  path:  '/productlist?id=' + this.$route.query.zid + '&cname=' + this.$route.query.cname  }" >{{ this.$route.query.pname }}</el-breadcrumb-item  >
    
      <el-breadcrumb-item :to="{ path: '/property?id=' + this.$route.query.zid + '&cname=' + this.$route.query.cname +'&pname='+this.$route.query.pname+'&zid='+this.$route.query.zid }">{{this.$route.query.pvname}}</el-breadcrumb-item>
      <el-breadcrumb-item>属性值</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin:10px 10px">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="input2">
            <el-button
              slot="append"
              type="primary"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-button type="primary">xxx</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="value" label="属性值名称"> </el-table-column>

      <el-table-column label="编辑属性值">
        <template slot-scope="scope">
          <el-button
            @click="updateProperty(scope.row)"
            type="text"
            size="small"
          >
            <i class="el-icon-edit"></i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除属性值">
        <template slot-scope="scope">
          <el-button @click="delete__(scope.row)" type="text" size="small">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination background :page-size="5"    @current-change="handleCurrentChange"    :total="this.total"></el-pagination> 
  </div>
</template>
<script>
export default {
  data() {
    return {
        zid:0,
        id:0,
        total:0,
      tableData: [
        {
          id: 0,
          value: "xxx"
        }
      ]
    };
  },
  mounted(){
          this.zid = this.$route.query.zid;
    this.id = this.$route.query.id;
//  thiz.$router.push({ name: "propertyValue", query: { cname:thiz.$route.query.cname, pname:row.subTitle, zid: thiz.id, id: row.id ,pvname:row.name} });
      window.console.log("this.$route.query.cname",this.$route.query.cname)   
       window.console.log("this.$route.query.pname",this.$route.query.pname)
       window.console.log("this.$route.query.pvname",this.$route.query.pvname)
             window.console.log("zid",this.$route.query.zid)   
             window.console.log("id",this.$route.query.id)  
             window.console.log("pid",this.$route.query.pid)  
              
    this.list();
 },
  methods:{
      list(){
          const thiz=this;
          thiz.$axios.get('/alter/propertyValue/list?id='+thiz.id+'&start='+0).then(res=>{
          thiz.total = res.data.data.totalElements;
            this.tableData=  res.data.data.content
          }).catch(err=>{
              window.console.log(err)
          })
      }
  }
};
</script>
