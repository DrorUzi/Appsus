'use strict';

import emailBigPreview from './email-big-preview.cmp.js'
import { eventBus } from '../../../main-services/eventbus-service.js'


export default {
    props: ['email'],
    template: `
        <section @click="isClick(email.id,email)" class="email-preview-container"> 
            <div class="preview-info" :class="{clicked : isClicked}">
            <img class="star" @click.stop="changeStared(email.id,email)"  :src="checkIfStared">
                <div class="name-preview">
                    <h3>{{email.name}}</h3>
                    <h4>{{email.subject}}</h4>
                </div>
                <div class="date-preview">
                    <h4>{{email.sentAt}}</h4>
                    <img title="Change reading status"class="read-envelope-img" :src="checkIfRead">
                </div>
            </div>
           <email-big-preview :email="email" :class="{hidden : !isClicked}"></email-big-preview>
        </section>
    `,
    data() {
        return {
            isClicked: false,
            isStared: false
        }
    },
    methods: {
        isClick(emailId,email) {
            this.isClicked = !this.isClicked
            if(!email.isRead) eventBus.$emit('read', (emailId))
        },
        changeStared(emailId,email){
            eventBus.$emit('star', (emailId))
        }
       
    },
    computed: {
        checkIfRead() {
            if (this.email.isRead) return '../../../../img/email/read.png'
            else return '../../../../img/email/unread.png'
        },
        checkIfStared(){
        if(this.email.isStared) return '../../../../img/email/star1.png'
        else return '../../../../img/email/star3.png'
        }

    },
    components: {
        emailBigPreview
    }

}
