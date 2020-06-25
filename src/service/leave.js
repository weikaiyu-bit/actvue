import request from "@/util/request";
let profix = "/api/process/leave";


export function add(data) {
    return request(`${profix}/add`, {
        methods: 'POST',
        data,
    })
}


export function servicerunTime(data) {
    return request(`${profix}/runTime`, {
        methods: 'GET',
        ...data //必须结构
    })

}


export function serviceFindPage(data) {
    return request(`${profix}/findPage`, {
        methods: 'GET',
        ...data //必须结构
    })

}

export function serviceTask(data) {
    return request(`${profix}/listTask`, {
        methods: 'GET',
        ...data
    })

}


