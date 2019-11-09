import emailService from "../email-services/email-service.js";
import { eventBus } from "../../../main-services/eventbus-service.js";

export default {
    props:['email'],
    template: `
    <section> 
        <div class="small-info-container">
            <h2>{{email.subject}}</h2>
            <div class="email-name-line">
                <div class="email-name">
                    <h4>{{email.name}}</h4>
                    <span><{{email.sentFrom}}></span>
                </div>
                <div class="preview-icons">
                    <img @click="onSaveNote(email)" src="../../../img/email/note.png">
                    <img @click="onDeleteEmail(email.id)" src="../../../img/email/delete.png">
                    <img @click="onEditMail(email.id)" title="Edit" src="../../../../img/email/edit.png">
                    <router-link :to="'/email/details/'+email.id">
                    <img src="../../../../img/email/fulldetails.png">
                    </router-link>
                </div>
            </div>
            <p>{{body}}</p>
    </div>
    </section>
    `,
    data(){
        return{
            note:{
                subject: '',
                body: ''
            },
            body : this.email.body.substring(0, 100) + '...'
        }
    },
    methods:{
        onDeleteEmail(id){
            emailService.deleteEmail(id)
            .then(()=>{
                eventBus.$emit('delete')
            })
            
        },
        onEditMail(emailId){
            this.$router.push(`/email/compose/${emailId}`)
        },
        onSaveNote(email){
            console.log('email',email);
            this.note.subject = email.subject;
            this.note.body = email.body
            eventBus.$emit('saveAsNote',this.note)
            this.$router.push('/note')
        }
    }

}

