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
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="methods.handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <el-icon>
                            <Rank />
                        </el-icon>
                    </el-tooltip>
                </div>
                <el-dropdown class="user-name" role="tooltip" popper-class="user-namelogout" trigger="click" @command="methods.handleCommand">
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
import { computed, ref } from 'vue'
import {ElTooltip, ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon} from 'element-plus'
import {Menu, Rank, CaretBottom} from '@element-plus/icons-vue'
import props from './props/header'
import bus from './bus'
export default {
    components: {
        ElTooltip,
        ElDropdown,
        ElDropdownMenu,
        ElDropdownItem,
        ElIcon,
        Menu,
        Rank,
        CaretBottom,
    },
    props,
    emits: ['logout'],
    setup(props: any, ctx: any) {
        const collapse = ref(true)
        const fullscreen = ref(false)
        const username = computed(() => {
            return props.u_name ? props.u_name : props.name
        })
        bus.on("collapsesidebar", (msg: any) => {
            collapse.value = msg
        })
        const methods = {
            // 用户名下拉菜单选择事件
            handleCommand(command: String) {
                if (command == "loginout")
                    ctx.emit('logout');
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
            }
        }

        return {
            fullscreen,
            collapse,
            username,
            methods
        }
    }
}
</script>