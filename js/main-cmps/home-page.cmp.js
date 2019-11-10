'use strict';
import navBar from '../main-cmps/main-header.cmp.js';



export default {
    template: `
    <section class="home-page">
    <nav-bar :currApp="'homepage'"></nav-bar>
        <div class="home-header">
            <img class="home-img" src="../img/bcg2.jpg" alt="">
           <h2>Keep On Track With Us</h2>
            <div class="home-page-links">
                <router-link class="add-link" to="/book"><h3>BOOKS</h3><img src="../../img/library.png"  alt=""><span>Expand your horizons and get into an amazing world of adventures with your favorite books!</span></router-link>
                <router-link class="add-link" to="/email/list"><h3>EMAIL</h3><img src="../../img/email2.png" alt=""><span>Use our newest technology with the unbelivible ability to contact remote friend and family! This unmatches idea could also be used for your job! only if you have one</span></router-link>
                <router-link class="add-link" to="/note"><h3>NOTES</h3><img src="../../img/note2.png" alt=""><span>Extend your brain to the machines! use our nice note app to store your memories in our hands! We will take good care of it!</span></router-link>
            </div>
        </div>
        
    </section>
    `,
    components:{
        navBar
    }
}

