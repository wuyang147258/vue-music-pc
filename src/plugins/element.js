import Vue from 'vue'

import {
    Button,
    Message,
    Container,
    Aside,
    Main,
    Footer,
    Header,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Scrollbar

} from 'element-ui'

Vue.use(Button)
Vue.use(Scrollbar)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)


Vue.prototype.$message = Message