'use strict';

import emailPreview from './email-preview.cmp.js'

export default {
    props:['emails'],
    template: `
    <section class="email-list"> 
                <email-preview :key="email.id" v-for="email in emails" :email="email">
                </email-preview>
    </section>
    `,
    components:{
        emailPreview
    }
}

