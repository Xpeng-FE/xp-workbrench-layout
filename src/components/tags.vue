<template>
    <div class="tags">
        <ul>
            <li
                class="tags-li"
                v-for="(item, index) in tagsList"
                :class="{ active: methods.isActive(item.path) }"
                :key="item.key"
            >
                <router-link :to="item.path" class="tags-li-title">
                    {{ item.title }}
                </router-link>
                <span class="tags-li-icon" @click="methods.closeTags(index)">
                    <el-icon>
                        <Close />
                    </el-icon>
                </span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="methods.handleTags" size="small">
                <el-button size="small" type="primary">
                    标签选项
                    <el-icon class="el-icon--right">
                        <ArrowDown />
                    </el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="other">关闭其它</el-dropdown-item>
                        <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, Ref, ref, watch } from 'vue'
import { ElIcon, ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton } from 'element-plus'
import { Close, ArrowDown } from '@element-plus/icons-vue'
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import bus from './bus'

export default {
    components: {
        ElIcon,
        Close,
        ElDropdown,
        ElDropdownMenu,
        ElDropdownItem,
        ElButton,
        ArrowDown,
    },
    setup() {
        const tagsList: Ref<TagsListItem[]> = ref([])
        const showTags = computed(() => {
            return tagsList.value.length > 0
        })
        const route = useRoute()
        const router = useRouter()
        const methods = {
            isActive(path: String) {
                let path1 = path.split("/")
                let path2 = route.fullPath.split("/")
                return path1[1] === path2[1]
            },
            // 关闭单个标签
            closeTags(index: number) {
                let delItem: DelItem = tagsList.value.splice(index, 1)[0]
                let item: DelItem = tagsList.value[index]
                    ? tagsList.value[index]
                    : tagsList.value[index - 1]
                if (item) 
                    delItem.path === route.fullPath && router.push(item.path)
                else 
                    window.location.href = "/"
                bus.emit("tags", tagsList.value)
            },
            closeTagByName(name: string) {
                let tagnames = window.localStorage.getItem("tagnames")?.split(",")
                if (tagnames != null) {
                    let index = tagnames.indexOf(name)
                    if (index > -1) this.closeTags(index)
                }
            },
            // 关闭全部标签
            closeAll() {
                tagsList.value = []
                router.push("/")
            },
            // 关闭其他标签
            closeOther() {
                const curItem = tagsList.value.filter((item: TagsListItem) => {
                    return item.path === route.fullPath;
                })
                tagsList.value = curItem
            },
            // 设置标签
            setTags(routeval: RouteLocationNormalizedLoaded) {
                let tagnames = window.localStorage.getItem("tagnames")
                let tagsurl = window.localStorage.getItem("tags")
                if (!tagnames || !tagsurl) {
                    tagnames = ''
                    tagsurl = ''
                }
                window.localStorage.setItem(
                    "oldtagnames",
                    tagnames
                );
                window.localStorage.setItem(
                    "oldtagurls",
                    tagsurl
                );
                const isExist = tagsList.value.some((item: TagsListItem) => {
                    let path3 = routeval.fullPath.split("?")
                    let path1 = item.path?.split("?")
                    path1 = path1[0].split("/")
                    let path2 = path3[0].split("/")

                    if (path1[1] === path2[1]) {
                        item.title = routeval.meta.title
                        item.path = routeval.fullPath
                        item.name = routeval.matched[1].components.default.name
                    }
                    return path1[1] === path2[1]
                });
                if (!isExist) {
                    if (tagsList.value.length >= 8) {
                        tagsList.value.shift()
                    }
                    tagsList.value.push({
                        title: route.meta.title,
                        path: route.fullPath,
                        name: route.matched[1].components?.default.name
                    });
                }
                bus.emit("tags", tagsList.value);
            },
            handleTags(command: string) {
                command === "other" ? methods.closeOther() : methods.closeAll();
            }
        }
        methods.setTags(route)
        watch(() => route,(newVal) => {
            methods.setTags(newVal)
        },{deep: true})

        return {
            tagsList,
            showTags,
            methods,
        }
    },
}
</script>
