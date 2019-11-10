'use strict';
import appFooter from './main-cmps/app-footer.cmp.js';
import router from './routes.js'


new Vue({
    router,
    el: '#appsus',
    template: `
        <div>
            <router-view></router-view>
            <app-footer></app-footer>
        </div>
    `,
    components:{
        appFooter
    }

})