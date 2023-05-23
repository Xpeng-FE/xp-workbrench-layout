<script lang="ts">
import { ref } from 'vue'
import { VBoxDialog } from '../components'
export default {
    name: "dashboard",
    components: {
        VBoxDialog,
    },
    setup() {
        const list = ref([
            {name: '纯色地图', code: 'pure'},
            {name: '高德电子地图', code: 'gaode'},
            {name: '高德卫星地图', code: 'gaodestar'},
            {name: '谷歌卫星地图', code: 'google'},
        ])
        const isShow = ref(true)
        const testClick = () => {
            console.log('sdfgg')
        }
        const toClose = () => {
            isShow.value = false
        }
        return {
            list,
            testClick,
            toClose,
            isShow,
        }
    }
}
</script>
<template>
    <div>
        <v-box-dialog :dialogStyle="{top: '100px',left: '100px'}" :title="'测试'">
            <template #content>dddd</template>
        </v-box-dialog>
        <v-box-dialog :dialogStyle="{top: '100px',left: '500px'}" :isList="true" :list="list" :onMenu="['pure', 'gaode']" @handleClickList="testClick">
            
        </v-box-dialog>
        <v-box-dialog className="test" :dialogStyle="{top: '300px',left: '100px'}" :dataPopperPlacement="'right'" :titleBg="'#fff'">
            <template #content>dddd</template>
        </v-box-dialog>
        <v-box-dialog v-if="isShow" :needArrow="false" title="路径面板" :needClose="true" :needDrag="true" @toClose="toClose">
            <template #content>ccc</template>
        </v-box-dialog>
    </div>
</template>