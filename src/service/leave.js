import request from "@/util/request";
let profix ="/api/process/leave";
export function add(data) {
    return request(`${profix}/add`, {
        methods: 'POST',
        data,
    })

}