<template>
    <div :class="wrapperClass" v-if="wrapperShow">
        <v-head :collapse="collapse" :name="name" :u_name="uName" :showTags="showTags" @logout="logout" :isSmall="noTagsSmallStyle"></v-head>
        <v-sidebar v-if="sideBarShow" :items="sideBarItems"></v-sidebar>
        <div class="content-box" :class="{'content-collapse': collapse}">
            <v-tags :tagShow="showTags" :noTagsToSmall="noTagsSmallStyle"></v-tags>
            <div class="content" :id="contentId">
                <router-view v-slot="{ Component }">
                    <transition :name="transitionName" mode="out-in">
                        <keep-alive v-if="needKeepaLive" :include="tagsList">
                            <component :is="Component" />
                        </keep-alive>
                        <component v-else :is="Component" />
                    </transition>
                </router-view>
            </div>
        </div>
        <slot name="others"></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { VHead, VSidebar, VTags, setup as entrySetup } from './'
import props from './props/layout'

export default defineComponent({
    components: {VHead, VSidebar, VTags},
    props,
    emits: ['logout'],
    setup(props, ctx) {
        const tagsList: Ref = ref([] as any[])
        entrySetup(props.collapse, tagsList)
        const logout = () => ctx.emit('logout')
        return { tagsList, logout }
    }
})
</script>
