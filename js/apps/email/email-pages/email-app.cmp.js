'use strict';

import emailList from '../email-cmps/email-list.cmp.js'
import sideBar from '../email-cmps/side-bar.cmp.js'
import emailService from '../email-services/email-service.js'

export default {
    template: `
    <section class="email-app">
        
         <side-bar></side-bar>
         <email-list :emails="emails" v-if="emails.length"></email-list>
        
    </section>
    `,
    data(){
      return {
        emails: [],
      }
    },
    components:{
      emailList,
      sideBar
    },
    created(){
      emailService.getEmails()
      .then(emails => {
        console.log('emails', emails);
        this.emails = emails
      })
    }
   
}


