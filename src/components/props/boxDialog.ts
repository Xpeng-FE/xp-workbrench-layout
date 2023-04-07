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
        type: Object,
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
        type: Array,
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
}