'use strict';

// import aboutPage from './pages/about.cmp.js';
import homepage from './main-cmps/home-page.cmp.js';
import email from './apps/email/email-pages/email-app.cmp.js';
import emailList from './apps/email/email-cmps/email-list.cmp.js'
import note from './apps/note/note-pages/note-app.cmp.js';
import noteEdit from './apps/note/note-pages/note-edit.cmp.js';
import details from './apps/email/email-pages/email-details.cmp.js';
import bigPreview from './apps/email/email-cmps/email-big-preview.cmp.js';
import compose from './apps/email/email-cmps/compose.cmp.js';


const myRoutes = [
    {
        path: '/',
        component: homepage
    },
    {
        path: '/email',
        component: email,
        children: [
            {
                path: 'list',
                component: emailList
            }, 
            {
                path: 'preview/+id',
                component: bigPreview
            }, 
            {
                path: 'compose',
                component: compose
            },
        ]
    },
    {
        path: '/note',
        component: note,
        children: [
            {
                path: 'edit/:id?',
                name:'edit',
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

