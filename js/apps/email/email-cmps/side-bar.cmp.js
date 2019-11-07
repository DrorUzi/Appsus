

export default {
    props:['unRead'],
    template: `
    <section class="side-bar"> 
        <router-link to="/email/compose"  >
            <div class="compose-btn">
                <img src="../../../img/email/compose.png">
                <span>COMPOSE</span>
            </div>
        </router-link>
        <div class="side-bar-options">
            <router-link class="opt" to="/email/list">
                <img src="../../../img/email/inbox.png">
                <h4>Inbox</h4>
            </router-link>              
                <div class="opt">
                    <img src="../../../img/email/star.png">
                    <h4>Stared</h4>
                </div>
                <div class="opt">
                    <img src="../../../img/email/outbox.png">
                    <h4>sent</h4>
                </div>
                <div class="opt">
                    <img src="../../../img/email/draft.png">
                    <h4>Drafts</h4>
                </div>
                <h4 class="enread">You have {{unRead}} unread emails </h4>
            </div>
    </section>
    `,   
}

