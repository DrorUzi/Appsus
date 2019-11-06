'use strict';



export default {
    template: `
    <section class="home-page">
        <div class="home-header">
            <h1>Appsus</h1>
            <h2>Come check our App</h2>
            <router-link to="/book">MISS BOOKS</router-link>
            <router-link class="add-link" to="/email">MISTER EMAIL</router-link>
            <router-link class="add-link" to="/keep">MISS KEEP</router-link>
            <router-link to="/about" exact>ABOUT</router-link>
        </div>
    </section>
    `,
   
}



