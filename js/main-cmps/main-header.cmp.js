

import theRouter from '../routes.js'

export default {
    router: theRouter,
    template: `
        <div class="home-main-header container">
            <img src="../../img/logo3.png">
            <nav class="main-nav-bar"> 
                <router-link to="/" exact>HOME</router-link> 
                <router-link to="/contact">CONTACT</router-link>
                <router-link to="/about" exact>ABOUT</router-link> 
            </nav>
        </div>
    `,

}



