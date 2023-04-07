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

declare interface SubRouteListItem {
    index: string,
    title: string,
    link?: string,
}

declare interface RouteListItem {
    icon: string,
    index: string,
    title: string,
    link?: string,
    subs?: SubRouteListItem[],
}

declare interface DelItem {
    path: string,
}

declare interface MenusList {
    name: string,
    code: string,
    key?: string,
}
