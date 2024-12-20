/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare interface TagsListItem {
    path: string,
    title?: string | unknown,
    name?: string | undefined,
    key?: any,
}
/** 菜单子目录跳转 */
declare interface SubRouteListItem {
    index: string,
    title: string,
    link?: string,
    variable?: boolean
}
/** 菜单目录，配置文件中的variable会被delete */
declare interface RouteListItem extends SubRouteListItem {
    icon: keyof typeof import('@element-plus/icons-vue')
    subs?: SubRouteListItem[]
}

declare interface DelItem {
    path: string,
}

declare interface MenusList {
    name: string,
    code: string,
    key?: string,
}
declare type StyleObj<S extends object = Record<string, any>> = S
