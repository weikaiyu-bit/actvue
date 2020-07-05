import request from "@/util/request";
let profix = "/api/process/role";


export function add(data) {
    return request(`${profix}/add`, {
        methods: 'POST',
        data,
    })
}

export function findPage(data) {
    return request(`${profix}/findPage`, {
        methods: 'GET',
        
    })
}