'use strict';

import router from './routes.js'

new Vue({
    router,
    el: '#appsus',
    template: `
        <div>
            <router-view></router-view>
        </div>
    `,

})