'use strict';

import { noteService } from "../note-services/note-service.js";
import { eventBus } from "../../../main-services/eventbus-service.js"

export default {
    template: `
    <section v-if="note">
        <form @submit.prevent class="note-edit">
            <div class="edit-inputs">
                <input type="text" placeholder="Title" v-model="note.title" ref="titleInput">
                <textarea cols="30" rows="3" v-model="note.txt" placeholder="Write text here"></textarea>
                <p v-if="note.editedAt" class="edited-at">Last edit at:{{note.editedAt}}</p>
            </div>
            <div class="note-checks">
                <div>
                    <label for="pin">PIN</label>
                    <input id="pin" type="checkbox" v-model="note.isPinned">
                </div>
                <div>
                    <label for="txt">txt</label>
                <input id="txt" type="radio" v-model="note.type" value="txt">
                </div>
                <div>
                    <label for="img">img</label>
                    <input id="img" type="radio" v-model="note.type" value="img">
                </div>
                <div>
                    <label for="todo">todo</label>
                    <input id="todo" type="radio" v-model="note.type" value="todo">
                </div>
            </div> 
            <div>
            <button @click="onSaveNote">Save</button>
            <button @click="onDeleteNote">Delete</button>
            </div>
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
                    this.note = {
                        title: '',
                        txt: '',
                        isPinned: false,
                        type: 'txt',
                        editedAt: ''
                    }
                    this.$router.push('/note');
                })
        },
        onDeleteNote() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    if (this.note.editedAt) {
                        noteService.deleteNote(this.noteId)
                            .then(msg => console.log(msg)
                            )
                    }

                    this.$router.push('/note');
                }
            })
        },
    },
    computed: {

    },
    mounted() {
    //    this.$refs.titleInput.focus()
    // gets error
    },
    created() {
        this.loadNote()
    },
    watch: {
        '$route.params.id'() {
            this.loadNote();
            this.$refs.titleInput.focus()
        }
    }

}