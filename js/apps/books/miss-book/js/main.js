'use strict';

import appHeader from './cmps/app-header.cmp.js'
import theRouter from './routes.js'
import mainFooter from './cmps/main-footer.cmp.js'
import userMsg from './cmps/user-msg.cmp.js';


export default {
    router: theRouter,
    template: `
        <div>
            <app-header></app-header>
            <user-msg></user-msg>
            <router-view></router-view>
            <main-footer></main-footer>
        </div>
    `,
    components: {
        appHeader,
        mainFooter,
        userMsg
    }

}


