'use strict';

import emailService from "../email-services/email-service.js";



export default {
    template: `
        <section class="email-details" v-if="email"> 
            <h2>{{email.subject}}</h2>
            <div class="email-name">
            <h4>{{email.name}}</h4>
            <p>{{email.sentFrom}}</p>
            </div>
            <p>{{email.body}}</p>
        </section>
    `,
    data() {
        return {
            email : null
        }
    },
    methods: {
        loadEmail() {
            const emailId = this.$route.params.id;
            console.log(this.$route.params.id);
            emailService.findEmailById(emailId)
                .then(email => {
                    this.email = email;
                })
        },
    },
    created() {
        this.loadEmail()
    }
}

