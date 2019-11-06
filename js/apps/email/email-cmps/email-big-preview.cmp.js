import emailService from "../email-services/email-service.js";

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
                <img @click="onDeleteEmail(email.id)" src="../../../img/email/delete.png">
                <router-link :to="'/email/details/'+email.id">
                <img src="../../../../img/email/fulldetails.png">
                </router-link>
                </div>
            </div>
            <p>{{email.body}}</p>
    </div>
    </section>
    `,
    methods:{
        onDeleteEmail(id){
            emailService.deleteEmail(id)
        }
    }
    
 
}

