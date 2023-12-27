<template>
    <div class="wrapper">
        <v-head :collapse="collapse" name="城市地图工作台"></v-head>
        <v-sidebar :items="items"></v-sidebar>
        <div class="content-box" :class="{'content-collapse': collapse}">
            <v-tags ref="smalltag"></v-tags>
            <div class="content">
                <router-view v-slot="{ Component }">
                    <transition name="workbench-app" mode="out-in">
                        <keep-alive :include="tagsList">
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Ref, ref } from 'vue'
import { VHead, VSidebar, VTags, setup as entrySetup, guid } from '../components'

export default {
    components: {
        VHead,
        VSidebar,
        VTags,
    },
    setup() {
        const collapse = ref(true)
        const tagsList: Ref = ref([] as any[])
        const items: Ref< RouteListItem[] > = ref([
            {
                icon: "Monitor",
                index: "/dashboard",
                title: "综合",
            },
            {
                icon: "Operation",
                index: "2",
                title: "属性管理",
                subs: [
                    {
                        index: "/propertySetting",
                        title: "配色管理",
                        link: "/propertySetting",
                    },
                    {
                        index: "/propertySetting2",
                        title: "随便",
                    }
                ]
            },
            {
                icon: "Operation",
                index: "3",
                title: "另外管理",
                subs: [
                    {
                        index: "/propertySettingcc",
                        title: "配色管理2",
                        link: "http://www.baidu.com",
                    },
                    {
                        index: "/propertySetting2",
                        title: "随便",
                    }
                ]
            },
            {
                icon: "Monitor",
                index: "",
                title: "测试",
                link: "http://www.baidu.com",
            },
        ])
        entrySetup(collapse, tagsList)
        return {
            collapse,
            tagsList,
            items,
        }
    }
}
</script>
