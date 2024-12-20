<template>
    <div :class="`xp-boxDialog${isList ? ' list' : ''}${className ? ' ' + (typeof className === 'string' ? className : JSON.stringify(className)) : ''}`" :data-popper-placement="dataPopperPlacement" :style="finalDialogStyle" ref="boxDialog">
        <span class="el-popper__arrow" v-if="needArrow"></span>
        <div v-if="!isList">
            <div class="title" v-if="$slots['title']" @mouseenter="startFocus(true)" @mouseleave="startFocus(false)" @mousedown="starttodrag">
                <slot name="title"></slot>
                <el-icon v-if="needClose" :size="20" style="position: absolute;right: 10px; top: 10px;cursor: pointer;" @click="toClose">
                    <CloseBold />
                </el-icon>
            </div>
            <div class="title" v-else-if="title !== ''" @mouseenter="startFocus(true)" @mouseleave="startFocus(false)" @mousedown="starttodrag">
                {{title}}
                <el-icon v-if="needClose" :size="20" style="position: absolute;right: 10px; top: 10px;cursor: pointer;" @click="toClose">
                    <CloseBold />
                </el-icon>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>
        </div>
        <div v-else>
            <ul>
                <li 
                    v-for="item in menus" 
                    :key="item.key" 
                    :class="onMenu === item.code || (typeof onMenu !== 'string' && onMenu.indexOf(item.code) > -1) ? 'is-disabled' : ''" 
                    @click="handleClick(item.code)"
                >{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import props from './props/boxDialog'
import { ElIcon } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
export default defineComponent({
    props,
    components: {
        ElIcon,
        CloseBold,
    },
    setup(props, ctx) {
        const menus: Ref< MenusList[] > = ref(props.list)
        const boxDialog: Ref< HTMLElement | undefined > = ref()
        const finalDialogStyle = ref(props.dialogStyle)
        if (props.needDrag) finalDialogStyle.value['userSelect'] = 'none'
        onMounted(() => {
            if (props.background) 
                boxDialog.value?.setAttribute('style', boxDialog.value?.getAttribute('style') + `--bg-color: ${props.background}`)
            if (props.titleBg)
                boxDialog.value?.setAttribute('style', boxDialog.value?.getAttribute('style') + `--box-title-bg-color: ${props.titleBg}`)
        })
        const handleClick = (code: string) => {
            if (props.onMenu === code || (typeof props.onMenu !== 'string' && props.onMenu.indexOf(code) > -1)) return
            ctx.emit('handleClickList', code)
        }
        const startFocus = (isStart: boolean = true) => {
            ctx.emit('startFocus', isStart)
        }
        const toClose = () => {
            ctx.emit('toClose')
        }
        const starttodrag = (e: MouseEvent) => {
            if (!props.needDrag) return
            let left = parseInt(boxDialog.value?.style.left || (boxDialog.value ? window.getComputedStyle(boxDialog.value)?.left : '0')),
                top = parseInt(boxDialog.value?.style.top || (boxDialog.value ? window.getComputedStyle(boxDialog.value)?.top : '0'))
            document.onmousemove = (event) => {
                boxDialog.value!.style.left = `${((left ? left : 5) + event.screenX - e.screenX)}px`
                if (finalDialogStyle.value.left !== undefined) finalDialogStyle.value.left = boxDialog.value!.style.left
                boxDialog.value!.style.top = `${(top ? top : 35) + event.screenY - e.screenY}px`
                if (finalDialogStyle.value.top !== undefined) finalDialogStyle.value.top = boxDialog.value!.style.top
            }
            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null
                ctx.emit('endDrag')
            }
        }
        return {
            boxDialog,
            startFocus,
            handleClick,
            toClose,
            starttodrag,
            finalDialogStyle,
            menus
        }
    },
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/boxDialog.scss';
</style>