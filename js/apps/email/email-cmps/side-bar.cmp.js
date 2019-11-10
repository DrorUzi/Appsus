import { eventBus } from "../../../main-services/eventbus-service.js";


export default {
    props: ['unRead'],
    template: `
    <section class="side-bar"> 
        <div class="email-screen" @click="toggleMenu" :class="{'email-open-menu-screen':isMenuOpen}">
        </div>
        <div class="folders">
            <div @click="toggleMenu" class="nav-icon-side-bar"><img src="../../../img/email/menu.png"></div>
            <span><img class="arrow" src="../../../img/email/left.png">FOLDERS</span>
        </div>
        <div @click="toggleMenu(); openFilter()" class="side-bar-options" :class="{'email-open-menu':isMenuOpen}">
            <router-link class="opt" to="/email/list" exact>
                <img src="../../../img/email/inbox.png">
                <h4>Inbox</h4>
            </router-link>         
            <router-link class="opt" to="/email/stared" exact>
                    <img src="../../../img/email/star.png">
                    <h4>Stared</h4>
            </router-link>
            <router-link class="opt" to="/email/sent" exact>
                    <img src="../../../img/email/outbox.png">
                    <h4>sent</h4>
                </router-link>
                <router-link class="opt" to="/email/draft" exact>
                    <img src="../../../img/email/draft.png">
                    <h4>Drafts</h4>
                </router-link>
                <router-link class="opt" to="/email/deleted" exact>
                    <img class=" delete" src="../../../img/email/delete.png">
                    <h4>Deleted</h4>
                </router-link>
                <h4 class="unread">You have {{unRead}} unread emails </h4>
            </div>
    </section>
    `,
    data() {
        return {
            isMenuOpen: false
        }
    },
    methods: {
        openFilter() {
            eventBus.$emit('openFilter',false)
        },
        toggleMenu() { 
            this.isMenuOpen = !this.isMenuOpen
        }
     
    },
}



