'use strict';


export default {
    props:['email'],
    template: `
        <section class="email-preview"> 
             <h2>Subject: {{email.subject}}</h2>
        </section>
    `,
   
}
