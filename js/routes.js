'use strict';

// import aboutPage from './pages/about.cmp.js';
import homepage from './main-cmps/home-page.cmp.js';


const myRoutes = [
    {
        path: '/',
        component: homepage
    },
    {
        path: '/about',
        component: aboutPage,
        children: [
            {
                path: 'harta',
                component: harta
            }]
    },

]
const myRouter = new VueRouter({ routes: myRoutes })

export default myRouter;

