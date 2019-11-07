'use strict';

import emailList from '../email-cmps/email-list.cmp.js'
import sideBar from '../email-cmps/side-bar.cmp.js'
import emailService from '../email-services/email-service.js'
import { eventBus } from '../../../main-services/eventbus-service.js'

export default {
    template: `
    <section class="email-app" >
         <side-bar :unRead="unRead"></side-bar>
         <router-view></router-view>
         <email-list :emails="emails" v-if="emails.length"></email-list>
    </section>
    `,
    data(){
      return {
        emails: [],
        unRead : null
      }
    },
    components:{
      emailList,
      sideBar
    },
    created(){
      emailService.getEmails()
      .then(emails => {
        this.emails = emails
      })
      eventBus.$on('read',(emailId)=>{
        emailService.changeToRead(emailId)
        emailService.getUnreadMails()
        .then(res => this.unRead = res) 
      })
      eventBus.$on('newMail', (newEmail)=> {
        emailService.sendMail(newEmail)
      })
      eventBus.$emit('emails',this.emails)
      

    },
    mounted(){
      emailService.getUnreadMails()
      .then(res => this.unRead = res) 
    }
   
}


