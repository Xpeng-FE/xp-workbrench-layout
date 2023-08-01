<template>
    <div class="sidebar" @mouseleave="closeSidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#404040"
            text-color="#fcfcfc"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items" :key="item.key">
                <el-sub-menu v-if="item.subs" :index="item.index" popper-class="sidebarsubmenu">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"/>
                        </el-icon>
                        <span>{{ item.title }}</span>
                    </template>
                    <template v-for="subItem in item.subs" :key="subItem.key">
                        <el-menu-item :index="subItem.index" :disabled="!!subItem.link">
                            {{ subItem.title }}
                        </el-menu-item>
                    </template>
                </el-sub-menu>
                <el-menu-item v-else-if="item.index !== ''" :index="item.index">
                    <el-popover v-if="collapse" placement="right" effect="dark" :content="item.title" popper-class="menuitempop" trigger="hover">
                        <template #reference>
                            <el-icon>
                                <component :is="item.icon"/>
                            </el-icon>
                        </template>
                    </el-popover>
                    <el-icon v-else>
                        <component :is="item.icon"/>
                    </el-icon>
                    <span>{{ item.title }}</span>
                </el-menu-item>
                <li v-else role="menuitem" class="el-menu-item" tabindex="-1" @click="handleClick(item.link)">
                    <el-popover v-if="collapse" placement="right" effect="dark" :content="item.title" popper-class="menuitempop" trigger="hover">
                        <template #reference>
                            <el-icon>
                                <component :is="item.icon"/>
                            </el-icon>
                        </template>
                    </el-popover>
                    <el-icon v-else>
                        <component :is="item.icon"/>
                    </el-icon>
                    <span>{{ item.title }}</span>
                </li>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { ElMenu, ElMenuItem, ElSubMenu, ElIcon, ElPopover, } from 'element-plus'
import { useRoute } from 'vue-router'
import bus from './bus'
import props from './props/sidebar'
import * as EleIcons from '@element-plus/icons-vue'

export default defineComponent({
    props,
    components: {
        ElMenu,
        ElMenuItem,
        ElSubMenu,
        ElIcon,
        ElPopover,
        ...EleIcons,
    },
    setup(props) {
        const route = useRoute()
        const onRoutes = computed(() => {
            return route.path
        })
        const collapse = ref(true);
        bus.on("collapse", (msg: any) => {
            collapse.value = msg
        })
        const methods = reactive({
            closeSidebar() {
                collapse.value = true
                bus.emit("collapsesidebar", collapse.value)
            },
            handleClick(link: string | undefined) {
                if (typeof link === 'undefined' || link === route.path) return
                window.open(link)
            }
        })
        const getLink = (text: string) => {
            let link: any = null
            for (let menu of props.items) {
                if (typeof menu.subs === 'undefined') continue
                for (let sub of menu.subs) {
                    if (sub.title === text) {
                        link = sub.link ?? null
                        break
                    }
                }
                if (link) break
            }
            return link
        }
        onMounted(() => {
            let sidebarsubmenus = document.getElementsByClassName('sidebarsubmenu')
            for (let k = 0; k < sidebarsubmenus.length; k ++) {
                let allClasses = sidebarsubmenus[k].getAttribute('class')?.split(' ')
                if (allClasses?.includes('el-popper')) continue
                let elements = sidebarsubmenus[k].getElementsByTagName('li')
                for (let i = 0; i < elements.length; i ++) {
                    let link = getLink(elements[i].innerText)
                    if (link) elements[i].addEventListener('click', () => methods.handleClick(link))
                }
            }
        })
        return {
            onRoutes,
            collapse,
            ...toRefs(methods),
        }
    },
})
</script>
