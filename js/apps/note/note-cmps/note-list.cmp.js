import { noteService } from '../note-services/note-service.js';
import txtPreview from './note-txt-preview.cmp.js';
import imgPreview from './note-img-preview.cmp.js';
import todoPreview from './note-todo-preview.cmp.js';
import noteEdit from '../note-pages/note-edit.cmp.js';
export default {
    props: ['notes'],
    template: `
    <section class="">
        <div>
            <transition name="slide-fade">
                <router-view></router-view>
            </transition>
        </div>
        <section>
            <fieldset class="pinned-fieldset">
                <legend class="pinned-legend">Pinned</legend>
                <section class="note-list pinned">
                    <component v-if="currNote.isPinned" class="list-item" 
                    :class="currNote.type" 
                    :key="currNote.id"
                    :style="{backgroundColor:currNote.bcgColor}"
                    v-for="currNote in notes" 
                    :is="currNote.type+'Preview'" :note="currNote"></component>
                </section>
            </fieldset>
            <section class="note-list">
                <component v-if="!currNote.isPinned" class="list-item" 
                :class="currNote.type" 
                :key="currNote.id"
                :style="{backgroundColor:currNote.bcgColor}"
                v-for="currNote in notes" 
                :is="currNote.type+'Preview'" :note="currNote"></component>
            </section>
        </section>
    </section>
    `,
    data() {
        return {
            //wanna try to change note bcg color opacity only^^^^^^^
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
        imgPreview,
        todoPreview
    }
}