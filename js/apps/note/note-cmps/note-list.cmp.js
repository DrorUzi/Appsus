import { noteService } from '../note-services/note-service.js';
import txtPreview from './note-txt-preview.cmp.js';
import noteEdit from '../note-pages/note-edit.cmp.js';
export default {
    props: ['notes'],
    template: `
    <section class="">
        <router-view></router-view>
        <section class="note-list">
            <router-link class="list-item" :class="currNote.type" :key="currNote.id" :to="'/note/edit/'+currNote.id" v-for="currNote in notes">
            <txt-preview :note="currNote"></txt-preview></router-link>
        </section>
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
        txtPreview,
        noteEdit,
    }
}