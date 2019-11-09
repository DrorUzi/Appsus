import { eventBus } from "../../../main-services/eventbus-service.js";


export default {
    props:['unRead'],
    template: `
    <section class="side-bar"> 
        <div @click="openFilter" class="side-bar-options">
            <router-link class="opt" to="/email/list">
                <img src="../../../img/email/inbox.png">
                <h4>Inbox</h4>
            </router-link>         
            <router-link class="opt" to="/email/stared">
                    <img src="../../../img/email/star.png">
                    <h4>Stared</h4>
            </router-link>
            <router-link class="opt" to="/email/sent">
                    <img src="../../../img/email/outbox.png">
                    <h4>sent</h4>
                </router-link>
                <router-link class="opt" to="/email/draft">
                    <img src="../../../img/email/draft.png">
                    <h4>Drafts</h4>
                </router-link>
                <router-link class="opt" to="/email/deleted">
                    <img class=" delete" src="../../../img/email/delete.png">
                    <h4>Deleted</h4>
                </router-link>
                <h4 class="unread">You have {{unRead}} unread emails </h4>
            </div>
    </section>
    `,
    methods:{
        openFilter(){
            eventBus.$emit('openFilter')
        }
    }
}

