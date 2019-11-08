import emailPreview from './email-preview.cmp.js'
import emailService from '../email-services/email-service.js'


export default {
    template: `
    <section class="email-list"> 
                <email-preview :key="email.id" v-for="email in emails" :email="email">
                </email-preview>
    </section>
    `,
    data(){
        return {
            emails:[],
        }
    },
    components:{
        emailPreview
    },
    created(){
         emailService.getDeletedEmails()
         .then(emails => this.emails = emails)
         eventBus.$on('emailToShow',(emails)=> {
            this.emails = emails
         })
         eventBus.$on('sortedEmails',(emails)=> {
            this.emails = emails
         })
    }
}

