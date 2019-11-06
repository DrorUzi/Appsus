import { noteService } from '../note-services/note-service.js';
import notePreview from './note-preview.cmp.js';
// :key="currNote.id"
export default {
    props: ['notes'],
    template: `
    <section class="">
        <h1>lalalla</h1>
        <ul class="note-list">
            <note-preview v-for="currNote in notes" :note="currNote"></note-preview>
        </ul>
    </section>
    `,
    data() {
        return {
            // notes:[],
        }
    },
    methods: {

    },
    computed: {
    },
    created() {

    },
    components: {
        notePreview
    }
}