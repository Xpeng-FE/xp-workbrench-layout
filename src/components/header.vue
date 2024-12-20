<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="methods.collapseChage">
            <el-icon>
                <Menu />
            </el-icon>
        </div>
        <div class="logo">{{name}}</div>
        <div class="header-right">
            <div class="header-user-con">
                <div class="btn-expandTags" v-if="showExpendTagsBtn" @click="methods.handleExpandTags">
                    <el-tooltip effect="dark" content="展开标签">
                        <el-icon><CollectionTag /></el-icon>
                    </el-tooltip>
                </div>
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="methods.handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <el-icon>
                            <Rank />
                        </el-icon>
                    </el-tooltip>
                </div>
                <el-dropdown :size="smallBtn ? 'small' : ''" class="user-name" role="tooltip" popper-class="user-namelogout" trigger="click" @command="methods.handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import {ElTooltip, ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon} from 'element-plus'
import {Menu, Rank, CaretBottom, CollectionTag} from '@element-plus/icons-vue'
import props from './props/header'
import bus from './bus'
export default defineComponent({
    components: {
        ElTooltip,
        ElDropdown,
        ElDropdownMenu,
        ElDropdownItem,
        ElIcon,
        Menu,
        Rank,
        CaretBottom,
        CollectionTag,
    },
    props,
    emits: ['logout'],
    setup(props, ctx) {
        const collapse = ref(true)
        const fullscreen = ref(false)
        const username = computed(() => {
            return props.u_name ? props.u_name : props.name
        })
        const smallBtn = ref(props.isSmall)
        const localStorage = window.localStorage
        const showTagsVal = !!(localStorage.getItem('tagsStatus') ?? props.showTags)
        const showExpendTagsBtn = ref(!showTagsVal)
        bus.on("collapsesidebar", (msg: any) => {
            collapse.value = msg
        })
        bus.on("packupTags", () => {
            showExpendTagsBtn.value = true
            document.getElementsByClassName('content-box')?.[0].setAttribute('style', 'padding-bottom: 0;')
            if (props.isSmall) smallBtn.value = true
            localStorage.setItem('tagsStatus', '')
        })
        const methods = {
            // 用户名下拉菜单选择事件
            handleCommand(command: String) {
                if (command == "loginout") ctx.emit('logout')
            },
            // 侧边栏折叠
            collapseChage() {
                collapse.value = !collapse.value
                bus.emit("collapse", collapse.value)
            },
            // 全屏事件
            handleFullScreen() {
                let element = document.documentElement
                if (fullscreen.value)
                    document.exitFullscreen()
                else
                    element.requestFullscreen()
                fullscreen.value = !fullscreen.value
            },
            handleExpandTags() {
                showExpendTagsBtn.value = false
                bus.emit("expandTags")
                const dom = document.getElementsByClassName('content-box')?.[0]
                const originStyle = dom.getAttribute('style')
                if (originStyle) dom.setAttribute('style', originStyle.replace('padding-bottom: 0;', ''))
                if (props.isSmall) smallBtn.value = false
                localStorage.setItem('tagsStatus', 'show')
            }
        }

        return {
            fullscreen,
            collapse,
            username,
            methods,
            showExpendTagsBtn,
            smallBtn,
        }
    }
})
</script>