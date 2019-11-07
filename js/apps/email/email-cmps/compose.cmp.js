import { eventBus } from "../../../main-services/eventbus-service.js"



export default {
    template: `
    <section class="compose"> 
        <form class="form-review" @submit.prevent="submitForm">
            <input class="input-name" ref="inputName" type="text"
                 placeholder="Name" v-model="email.name" />
             <input class="input-name" ref="inputName" type="text"
                placeholder="Subject" v-model="email.Subject" />
            <textarea class="input-text" placeholder="body" v-model="email.body">
            </textarea>
            <input class="input-text" type="email" placeholder="Enter your email"
             pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  required  v-model="email.sentFrom">
            <input class="input-text" type="email" placeholder="Send to" 
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  required v-model="email.sentTo">
            <router-link to="/email">
                <button class="add-btn"><img src="../../../../img/email/send2.png">SEND</button>
            </router-link>
         </form>
    </section>
    `,
    data(){
        return {
            email : {
                Subject: '',
                name: '',
                body: '',
                sentTo: '',
                sentFrom: '',
                isRead: false,
                isMarked: false,
                sentAt: new Date().toLocaleString()
            }
        }
    },
    methods: {
        submitForm() {
            eventBus.$emit('newMail', JSON.parse(JSON.stringify(this.email)) )
        }
    }
}

