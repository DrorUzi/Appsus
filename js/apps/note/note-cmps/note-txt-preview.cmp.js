'use strict';

export default {
    props: ['note'],
    template: `
    <div class="note-preview">
        <h3>Title: {{note.title}}</h3>
        <p>{{note.data}}</p>
        <router-link class="edit-link" :to="'/note/edit/'+note.id">edit</router-link>
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