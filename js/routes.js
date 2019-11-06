'use strict';

// import aboutPage from './pages/about.cmp.js';
import homepage from './main-cmps/home-page.cmp.js';
import email from './apps/email/email-pages/email-app.cmp.js';
import note from './apps/note/note-pages/note-app.cmp.js';
import noteEdit from './apps/note/note-pages/note-edit.cmp.js';


const myRoutes = [
    {
        path: '/',
        component: homepage
    },
    {
        path: '/email',
        component: email
    },
    {
        path: '/note',
        component: note,
        children: [
            {
                path: 'edit/:id?',
                component: noteEdit
            },
        ]
    },
    // {
    //     path: '/about',
    //     component: aboutPage,
    //     children: [
    //         {
    //             path: 'harta',
    //             component: harta
    //         }]
    // },

]
const myRouter = new VueRouter({ routes: myRoutes })

export default myRouter;

