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
        return {
            list,
        }
    }
}
</script>
<template>
    <div>
        <v-box-dialog :dialogStyle="{top: '100px',left: '100px'}" :title="'测试'">
            <template #content>dddd</template>
        </v-box-dialog>
        <v-box-dialog :dialogStyle="{top: '100px',left: '500px'}" :isList="true" :list="list" :onMenu="['pure', 'gaode']">
            
        </v-box-dialog>
        <v-box-dialog className="test" :dialogStyle="{top: '300px',left: '100px'}" :dataPopperPlacement="'right'" :titleBg="'#fff'">
            <template #content>dddd</template>
        </v-box-dialog>
    </div>
</template>