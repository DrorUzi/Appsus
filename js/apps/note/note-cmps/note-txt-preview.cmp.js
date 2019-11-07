'use strict';

export default {
    props: ['note'],
    template: `
    <div class="note-preview">
        <h2>Title: {{note.title}}</h2>
        <h3>{{note.txt}}</h3>
        <router-link class="edit-link add-btn" :to="'/note/edit/'+note.id">edit</router-link>
    </div>
    `,
    data() {
        return {
            
        }
    },
    methods:{


    },
    computed: {

       
    },
    created() {

    }
}