'use strict';
import navBar from '../main-cmps/main-header.cmp.js';



export default {
    template: `
    <section class="home-page">
    <nav-bar :currApp="'homepage'"></nav-bar>
        <div class="home-header">
            <img class="home-img" src="../../img/bcg2.jpg" alt="">
            <router-link to="/book">MISS BOOKS</router-link>
            <router-link class="add-link" to="/email/list">MISS EMAIL</router-link>
            <router-link class="add-link" to="/note">MISS KEEP</router-link>
            <router-link to="/about" exact>ABOUT</router-link> 
            <section class="homepage-info">
            
                <div class="icon-stack">
                    <span class="fa stack fa-6x">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class="fas fa-sticky-note fa-stack-1x inside-icon"></i>
                    </span>
                </div>
                <div>
                <span class="fa stack fa-6x">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fas fa-sticky-note fa-stack-1x inside-icon"></i>
            </span>
                </div>
                <div>
                <span class="fa stack fa-6x">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fas fa-sticky-note fa-stack-1x inside-icon"></i>
            </span>
                </div>

            </section>
        </div>
        
    </section>
    `,
    components:{
        navBar
    }
}

