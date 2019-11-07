'use strict';

export default {
    props: ['note'],
    template: `
    <div class="note-preview">
        <h2>Title: {{note.title}}</h2>
        <img src="img/logo.png" alt="Appsus Logo" title="Appsus">
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