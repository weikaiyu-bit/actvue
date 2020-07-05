import request from "@/util/request";
let profix = "/api/process/user";


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
export function addRole(data) {
    return request(`${profix}/addRole`, {
        methods: 'POST',
        data
    })
}
