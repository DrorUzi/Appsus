'use strict';

export default {
    props: ['note'],
    template: `
    <li class="note-preview">
        <h2>i am a {{note.title}}</h2>
        <h2>id {{note.id}}</h2>
        <h3>{{note.txt}}</h3>
    </li>
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