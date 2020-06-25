const jconObj = [
    { id: "el-icon-house" },
    { id: "el-icon-s-management" },
    { id: "el-icon-user" },
    { id: "el-icon-attract" }
];
const fatherAside = [

    //     <el-menu-item index="/welcome">
    //     <i class="el-icon-setting"></i>
    //     <span slot="title">系统首页</span>
    //   </el-menu-item>

    {
        id: "1",
        name: "系统管理",
        sonAside: [
            { id: "1-1", name: "系统首页", path: 'welcome' }
        ]
    },
    {
        id: "2",
        name: "请假管理",
        sonAside: [
            { id: "2-1", name: "请假管理", path: 'power' },
            { id: "2-2", name: "任务管理", path: 'task' },
        ]
    },
]


export default {
    jconObj,
    fatherAside
}