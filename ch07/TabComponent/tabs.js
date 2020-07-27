Vue.component('tabs', {
    name: 'tabs',
    template: '\
        <div class="tabs">\
            <div class="tabs-bar">\
                <div\
                :class="tabCls(item)"\
                 v-for="(item, index) in navList"\
                @click="handleChange(index)">\
                    {{ item.name }}\
                </div>\
            </div>\
            <div class="tabs-content">\
                <slot></slot>\
            </div>\
        </div>',
    props: {
        value: {
            type: [String, Number]
        }
    },
    data() {
        return {
            navList: [],
            currentTabIndex: this.value
        }
    },
    methods: {
        tabCls(item) {
            return [
                'tabs-tab',
                {
                    'tabs-tab-active': item.name === this.currentTabIndex
                }
            ]
        },
        getTabs() {
            return this.$children.filter(function (item) {
                return item.$options.name === 'pane'
            })
        },
        updateNav() {
            this.navList = []
            var _this = this

            this.getTabs().forEach((pane, index) => {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                })
                if (index === 0) {
                    if (!_this.currentTabIndex) {
                        _this.currentTabIndex = pane.name || index
                    }
                }
            });

            this.updateStatus()
        },
        updateStatus() {
            var tabs = this.getTabs()
            var _this = this
            tabs.forEach((tab) => {
                tab.show = tab.name === _this.currentTabIndex
            })
        },
        handleChange(index) {
            var nav = this.navList[index]
            var name = nav.name
            this.currentTabIndex = name
            this.$emit('input', name)
            //方便用户调用
            this.$emit('on-click', name)
        }
    },
    watch: {
        value: function (val) {
            this.currentTabIndex = val
        },
        currentTabIndex(val) {
            //更新界面
            this.updateStatus()
        }
    }
})