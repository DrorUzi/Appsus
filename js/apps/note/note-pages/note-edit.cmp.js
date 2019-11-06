'use strict';

import { noteService } from "../note-services/note-service.js";

export default {
    template: `
    <section class="note-edit">
        <h2>note Id: {{noteId}}</h2>
        <form @submit.prevent>
            <input type="text" placeholder="Title" v-model="note.title">
            <textarea cols="30" rows="5" v-model="note.txt" placeholder="Write text here"></textarea>
            <div>
                <label for="pin">PIN</label>
                <input id="pin" type="checkbox" v-model="note.isPinned">
                <label for="txt">txt</label>
                <input id="txt" type="radio" v-model="note.type" value="txt">
                <label for="img">img</label>
                <input id="img" type="radio" v-model="note.type" value="img">
                <label for="todo">todo</label>
                <input id="todo" type="radio" v-model="note.type" value="todo">
            </div> 
            <button @click="onSaveNote">Save</button>
        </form>
    </section>
    `,
    data() {
        return {
            noteId: '',
            note: {
                title: '',
                txt: '',
                isPinned: false,
                type: 'txt',
                editedAt: ''
            }
        }
    },
    methods: {
        loadNote() {
            this.noteId = this.$route.params.id;
            if (this.noteId) {
                this.note = noteService.findNoteById(this.noteId)
                    .then(console.log(this.note)
                    )
            }
//need to finish this note loading stuff

        },
        onSaveNote() {
            this.note.editedAt = new Date().toLocaleString()
            noteService.saveNote(this.note, this.noteId)
        }

    },
    computed: {


    },
    created() {
        this.loadNote()
    },
    watch: {
        '$route.params.id'() {
            this.loadNote();
        }
    }
}