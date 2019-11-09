'use strict';
import { noteService } from '../note-services/note-service.js';

export default {
    props: ['currNote', 'isMouseIn'],
    template: `
    <div class="title-panel">
            <h2 class="title">Title: {{currNote.title}}</h2>
            <div>
                <label for="preview-pin"><i class="fas fa-thumbtack preview-icon" :class="[{'icon-clicked':currNote.isPinned} ,hidden]"></i></label>
                <input @change="saveChanges" id="preview-pin" class="checkbox-hide" type="checkbox" v-model="currNote.isPinned">
            </div>
        </div>
    `,
    data() {
        return {
        }
    },
    methods: {
        //bug with checkbox hack, if checkbox not visable dosent work!
        saveChanges() {
            console.log(this.currNote);
            noteService.saveNotesToStorage()
        }

    },
    computed: {
        hidden() {
            return (this.isMouseIn) ? '' : 'hidden';
        }

    },
    created() {

    }
}
