
export default {
    props: ['currApp'],
    template: `
    <div class="home-main-header container">
    <div class="screen" @click="toggleMenu" :class="{'open-menu-screen':isMenuOpen}"></div>
        <img src="../../img/logo3.png">
        <nav class="main-nav-bar"> 
            <button @click="toggleMenu" class="menu-btn">☰</button>
            <div class="main-nav" :class="{'open-menu':isMenuOpen}">
                <template v-if="currApp!=='homepage'">
                    <router-link class="nav-item" to="/" exact>Homepage</router-link> 
                    <router-link class="nav-item" v-if="currApp!=='missEmail'" to="/email" exact>Email</router-link>
                    <router-link class="nav-item" v-if="currApp!=='missBooks'" to="/books" exact>Books</router-link> 
                    <router-link class="nav-item" v-if="currApp!=='missKeep'" to="/note" exact>Keep</router-link> 
                </template>
                <template v-else>
                    <router-link class="nav-item" to="/" exact>Projects</router-link> 
                    <router-link class="nav-item" to="/contact">Contact</router-link>
                    <router-link class="nav-item" to="/about" exact>About</router-link>
                </template>
            </div>
        </nav>
    </div>
    `,
    data() {
        return {
            isMenuOpen: false
        }
    },
    methods: {
        toggleMenu() { 
            this.isMenuOpen = !this.isMenuOpen
        }
    },
}


