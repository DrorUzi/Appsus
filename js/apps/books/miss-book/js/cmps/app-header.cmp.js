'use strict';

import theRouter from '../routes.js'

export default {
    router: theRouter,
    template: `
        <div class="book-home-main-header">
            <h1>MISS BOOK</h1>
            <nav class="book-nav-bar"> 
                <router-link to="/" exact>Home Page</router-link> 
                <router-link to="/book">Books</router-link>
                <router-link class="add-link" to="/add">Add A Book</router-link>
                <router-link to="/about" exact>About</router-link> 
            </nav>
        </div>
    `,

}