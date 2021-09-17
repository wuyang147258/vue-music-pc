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
    Image,
    Scrollbar,
    Pagination,
    Breadcrumb,
    BreadcrumbItem


} from 'element-ui'

Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Pagination)
Vue.use(Scrollbar)
Vue.use(Image)
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