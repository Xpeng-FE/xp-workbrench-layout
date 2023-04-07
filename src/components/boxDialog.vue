<template>
    <div :class="`xp-boxDialog${isList ? ' list' : ''}${className ? ' ' + (typeof className === 'string' ? className : JSON.stringify(className)) : ''}`" :data-popper-placement="dataPopperPlacement" :style="dialogStyle" ref="boxDialog">
        <span class="el-popper__arrow" v-if="needArrow"></span>
        <div v-if="!isList">
            <div class="title" v-if="title !== ''">{{title}}</div>
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
import { onMounted, ref, Ref, SetupContext } from 'vue'
import props from './props/boxDialog'
export default {
    props,
    emits: ['handleClickList'],
    setup(props: any, ctx: SetupContext< Record< string, any > >) {
        const menus: Ref< MenusList[] > = ref(props.list)
        const boxDialog: Ref< HTMLElement | undefined > = ref()
        onMounted(() => {
            if (props.background) 
                boxDialog.value?.setAttribute('style', boxDialog.value?.getAttribute('style') as string + `--bg-color: ${props.background}`)
            if (props.titleBg)
                boxDialog.value?.setAttribute('style', boxDialog.value?.getAttribute('style') as string + `--box-title-bg-color: ${props.titleBg}`)
        })
        const handleClick = (code: string) => {
            ctx.emit('handleClickList', code)
        }
        return {
            boxDialog,
            handleClick,
            menus
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/boxDialog.scss';
</style>