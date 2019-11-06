import { noteService } from '../note-services/note-service.js';
import notePreview from './note-preview.cmp.js';
    import noteEdit from '../note-pages/note-edit.cmp.js';
export default {
    props: ['notes'],
    template: `
    <section class="">
        <router-view></router-view>
        <ul class="note-list">
            <router-link :key="currNote.id" :to="'/note/edit/'+currNote.id" v-for="currNote in notes">
            <note-preview :note="currNote"></note-preview></router-link>
        </ul>
    </section>
    `,
    data() {
        return {
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