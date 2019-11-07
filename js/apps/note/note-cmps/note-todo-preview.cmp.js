'use strict';

export default {
    props: ['note'],
    template: `
    <div class="note-preview">
        <h2>Title: {{note.title}}</h2>
        <h2>id {{note.id}}</h2>
        <input id="pin" type="checkbox">
        <input id="pin" type="checkbox">
        <h3>{{note.txt}}</h3>
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