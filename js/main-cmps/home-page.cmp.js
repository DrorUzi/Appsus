'use strict';



export default {
    template: `
    <section class="home-page">
        <div class="home-header">
            <img class="home-img" src="../../img/bcg2.jpg" alt="">
            <router-link to="/book">MISS BOOKS</router-link>
            <router-link class="add-link" to="/email/list">MISS EMAIL</router-link>
            <router-link class="add-link" to="/note">MISS KEEP</router-link>
            <router-link to="/about" exact>ABOUT</router-link>
        </div>
    </section>
    `,
}

