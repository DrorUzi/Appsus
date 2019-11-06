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

//need to add the user msg stuff

// /
// <user-msg></user-msg>
// <main-footer></main-footer>
// /