import { eventBus } from "../../../main-services/eventbus-service.js"
import emailService from "../email-services/email-service.js"


export default {
    template: `
    <section class="compose"> 
        <div class="compose-header">
            <h1>New Message</h1>
        </div>
        <form class="compose-form" @submit.prevent="submitForm">
                <input class="compose-input" ref="inputName" type="text"
                 placeholder="Name" v-model="email.name" />
                <input class="compose-input" ref="inputName" type="text"
                 placeholder="Subject" v-model="email.subject" required />
                <input class="compose-input" type="email" placeholder="Enter your email"
                 pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  required  v-model="email.sentFrom">
                <input class="compose-input" type="email" placeholder="Send to" 
                 pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  required v-model="email.sentTo">
                <textarea class="compose-input" placeholder="body" v-model="email.body">
                </textarea>
                <div class="compose-btn-container">
                    <button type="submit" class="send-btn"><img src="../../../../img/email/send2.png">Send</button>
                    <button type="button" @click="saveDraft" class="draft-btn">Save as draft</button>
                </div>
            </form>
    </section>
    `,
    data() {
        return {
            email: {
                subject: '',
                name: '',
                body: '',
                sentTo: '',
                sentFrom: '',
                isRead: false,
                isMarked: false,
                sentAt: new Date().toLocaleString(),
                isStared: false,
                isDeleted: false,
                isSent: true
            }
        }
    },
    methods: {
        submitForm() {
            eventBus.$emit('newMail', JSON.parse(JSON.stringify(this.email)))
            this.$router.push('/email/list')
        },
        saveDraft() {
            eventBus.$emit('newDraft', JSON.parse(JSON.stringify(this.email)))
            this.$router.push('/email/draft')
        },
        noteToMail(note) {
            console.log('hi',note, this);
            this.email.subject = note.title
            this.email.body = note.txt
           
        }
    },
    created() {
        const emailId = this.$route.params.id;
        if (emailId) {
            console.log('Handling Reply')
            emailService.findEmailById(emailId)
                .then(email => {
                    var newEmail = JSON.parse(JSON.stringify(email))
                    this.email = newEmail
                    this.email.subject = 'Re: ' + this.email.subject
                    this.email.isSent = true;
                    this.email.isRead = false;
                    eventBus.$emit('read', (this.email.id))
                })
        }
        // eventBus.$on('sendAsEmail', this.noteToMail)
        eventBus.$on('sendAsEmail', (note)=>{
            this.email.subject = 'Bambo' 
            console.log('Got sendAsEMail event');
            
        })
    }
}

