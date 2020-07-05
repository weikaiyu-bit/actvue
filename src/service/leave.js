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
export function servicedeleteRunTime(data) {
    return request(`${profix}/deleteRunTime`, {
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
export function serviceMyTask(data) {
    return request(`${profix}/listMyTask`, {
        methods: 'GET',
        ...data
    })
}




export function serviceListInfo(data) {
    return request(`${profix}/listinfo`, {
        methods: 'POST',
        data
    })
}

export function serviceCompleteTask(data) {
    return request(`${profix}/completeTask`, {
        methods: 'POST',
        data
    })
}

export function serviceClaim(data) {
    return request(`${profix}/claim`, {
        methods: 'GET',
        ...data
    })
}
export function servicehistory(data) {
    return request(`${profix}/listHistory`, {
        methods: 'GET',
        ...data
    })
}






