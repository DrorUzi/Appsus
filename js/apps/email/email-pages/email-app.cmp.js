'use strict';

import emailList from '../email-cmps/email-list.cmp.js'
import emailService from '../email-services/email-service.js'

export default {
    template: `
    <section class="email-app">
        <div>
         <email-list :emails="emails" v-if="emails.length"></email-list>
        </div>
    </section>
    `,
    data(){
      return {
        emails: [],
      }
    },
    components:{
      emailList
    },
    created(){
      emailService.getEmails()
      .then(emails => {
        console.log('emails', emails);
        this.emails = emails
      })
    }
   
}


