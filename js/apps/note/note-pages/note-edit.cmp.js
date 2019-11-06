'use strict';

import { noteService } from "../note-services/note-service.js";
import { eventBus } from "../../../main-services/eventbus-service.js"

export default {
    template: `
    <section class="note-edit" v-if="note">
        <h2>note Id: {{note.id}}</h2>
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
            note: null
        }
    },
    methods: {
        loadNote() {
            var idParam = this.$route.params.id
            if (idParam) {
                noteService.findNoteById(idParam)
                    .then(note => {
                        this.noteId = idParam
                        this.note = note
                    })
            }
            else {
                this.noteId = ''
                this.note = {
                    title: '',
                    txt: '',
                    isPinned: false,
                    type: 'txt',
                    editedAt: ''
                }
            }

        },
        onSaveNote() {
            this.note.editedAt = new Date().toLocaleString()
            noteService.saveNote(this.note, this.noteId)
                .then(() => {
                    //add success msg
                    this.noteId = ''
                    this.note = {
                        title: '',
                        txt: '',
                        isPinned: false,
                        type: 'txt',
                        editedAt: ''
                    }
                })
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