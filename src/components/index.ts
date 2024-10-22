import { Ref } from "vue"
import bus from "./bus"
import '@/assets/css/layout.scss';
import '@/assets/css/boxDialog.scss';

export const setup = (collapse: boolean, tagsList: Ref) => {
    bus.on('collapse', (msg) => {
        collapse = msg as boolean
    })
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.on('tags', (msg: any) => {
        let arr = [],
            patharr = []
        for (let i = 0, len = msg.length; i < len; i ++) {
            msg[i].name && arr.push(msg[i].name)
            msg[i].path && patharr.push(msg[i].name)
        }
        tagsList.value = arr
        window.localStorage.setItem('tagnames', arr.join(','))
        window.localStorage.setItem('tags', patharr.join(','))
    })
}

export { default as VHead } from "./header.vue"
export { default as VSidebar } from "./sidebar.vue"
export { default as VTags } from "./tags.vue"
export { default as VBoxDialog } from "./boxDialog.vue"
export { default as bus } from "./bus"
export { default as VLayout } from "./layout.vue"
export { guid } from './guid'