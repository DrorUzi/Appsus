'use strict';

import emailBigPreview from './email-big-preview.cmp.js'


export default {
    props:['email'],
    template: `
        <section @click="isClick" class="email-preview-container"> 
            <div class="preview-info" :class="{clicked : isClicked}">
                <div class="name-preview">
                    <h3>{{email.name}}</h3>
                    <h4>{{email.subject}}</h4>
                </div>
                <div class="date-preview">
                    <h4>{{email.sentAt}}</h4>
                    <img class="read-envelope-img" :src="checkIfRead">
                </div>
            </div>
           <email-big-preview :email="email" :class="{hidden : !isClicked}"></email-big-preview>
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
    },
    components:{
        emailBigPreview
    }
   
}
