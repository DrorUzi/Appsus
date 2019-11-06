'use strict';

export default {
    props:['email'],
    template: `
        <section @click="isClick" class="email-preview-container"> 
            <div class="preview-info">
            <div class="name-preview">
                <h3>{{email.name}}</h3>
                <h3>{{email.subject}}</h3>
            </div>
            <div class="date-preview">
                <h4>{{email.sentAt}}</h4>
                <img class="read-envelope-img" :src="checkIfRead">
            </div>
            </div>
            <div :class="{hidden : !isClicked}" class="small-info-container">
                <h2>{{email.subject}}</h2>
                <div class="email-name-line">
                    <div class="email-name">
                        <h4>{{email.name}}</h4>
                        <span><{{email.sentFrom}}></span>
                    </div>
                    <img src="../../../../img/email/fulldetails.png">
                </div>
                <p>{{email.body}}</p>
            </div>
        </section>
    `,
    data(){
        return{
            isClicked :false

        }
    },
    methods:{
        isClick(){
           this.isClicked = !this.isClicked
        },
    },
    computed:{
        
        checkIfRead(){
            if(this.email.isRead)return '../../../../img/email/read.png'
            else return '../../../../img/email/unread.png'
        }
    }
   
}
