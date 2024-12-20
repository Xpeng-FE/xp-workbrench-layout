import { PropType } from "vue";

export default {
    dataPopperPlacement: {
        type: String,
        default: 'bottom-start',
    },
    needArrow: {
        type: Boolean,
        default: true,
    },
    dialogStyle: {
        type: Object as PropType<StyleObj>,
        default: {},
    },
    background: {
        type: String,
        default: '',
    },
    titleBg: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
    isList: {
        type: Boolean,
        default: false,
    },
    list: {
        type: Array<MenusList>,
        default: [],
    },
    onMenu: {
        type: [String, Array],
        default: '',
    },
    className: {
        type: [String, Array],
        default: '',
    },
    needClose: {
        type: Boolean,
        default: false,
    },
    needDrag: {
        type: Boolean,
        default: false,
    },
}