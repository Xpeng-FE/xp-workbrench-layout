import { PropType } from "vue";

export default {
    items: {
        type: Array as PropType< RouteListItem[] >,
        default: [] as RouteListItem[],
    },
}