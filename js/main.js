'use strict';

import router from './routes.js'
import mainHeader from './main-cmps/main-header.cmp.js'

new Vue({
    router,
    el: '#appsus',
    template: `
        <div>
            <main-header></main-header>
            <router-view></router-view>
        </div>
    `,
    components:{
        mainHeader
    }

})