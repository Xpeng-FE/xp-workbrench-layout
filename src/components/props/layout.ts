export default {
    wrapperClass: {
        type: String,
        default: "wrapper",
    },
    wrapperShow: {
        type: Boolean,
        default: true,
    },
    collapse: {
        type: Boolean,
        default: true,
    },
    name: {
        type: String,
        default: '',
    },
    uName: {
        type: String,
        default: '',
    },
    sideBarShow: {
        type: Boolean,
        default: true,
    },
    sideBarItems: {
        type: Array<RouteListItem>,
        default: [],
    },
    needKeepaLive: {
        type: Boolean,
        default: true,
    },
    transitionName: {
        type: String,
        default: 'workbench-app',
    },
    contentId: {
        type: String,
        default: '',
    },
    showTags: {
        type: Boolean,
        default: true,
    },
    noTagsSmallStyle: {
        type: Boolean,
        default: false,
    },
}