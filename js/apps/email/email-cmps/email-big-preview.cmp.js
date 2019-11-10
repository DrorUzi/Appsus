import emailService from "../email-services/email-service.js";
import { eventBus } from "../../../main-services/eventbus-service.js";

export default {
    props:['email'],
    template: `
    <section> 
        <div class="small-info-container">
            <h2>{{email.subject}}</h2>
            <div class="email-name-line">
                <div class="email-name-details">
                    <h4>{{email.name}}</h4>
                    <span><{{email.sentFrom}}></span>
                
                <div class="preview-icons">
                    <img @click="onSaveNote(email)" title="Save as note" src="/img/email/note.png">
                    <img @click="onDeleteEmail(email.id)" title="Delete" src="/img/email/delete.png">
                    <img @click="onEditMail(email.id)"  title="Edit" src="/../img/email/edit.png">
                    <router-link title="See full email" :to="'/email/details/'+email.id">
                    <img src="/../img/email/fulldetails.png">
                    </router-link>
                </div>
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
            Swal.fire({
                title: 'Are you sure you want to delete the email?',
                text: 'You will be able to see it on the deleted emails',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes'
            }).then((result) => {
             if(result.value){
                emailService.deleteEmail(id)
                .then(()=>{
                    eventBus.$emit('delete')
                })
             }
            })

        },
        onEditMail(emailId){
            this.$router.push(`/email/compose/${emailId}`)
        },
        onSaveNote(email){
            Swal.fire({
                title: 'Do you want to save it as a note?',
                text: 'You will be redirected to another page',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes'
            }).then((result) => {
             if(result.value){
                this.note.subject = email.subject;
                this.note.body = email.body
                eventBus.$emit('saveAsNote',this.note)
                this.$router.push('/note')
             }
            })
         
        }
    }

   
}

