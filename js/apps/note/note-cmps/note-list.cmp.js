import { noteService } from '../note-services/note-service.js';
import notePreview from './note-preview.cmp.js';
    import noteEdit from '../note-pages/note-edit.cmp.js';
export default {
    props: ['notes'],
    template: `
    <section class="">
        <h1>lalalla</h1>
        <router-view></router-view>
        <ul class="note-list">
            <router-link :key="currNote.id" :to="'/note/edit/'+currNote.id" v-for="currNote in notes"><note-preview :note="currNote"></note-preview></router-link>
        </ul>
    </section>
    `,
    data() {
        return {
            // notes:[],
            currNoteId: null,
            isEditing: false,
        }
    },
    methods: {

    },
    computed: {
    },
    created() {
 
    },
    components: {
        notePreview,
        noteEdit,
    }
}