'use strict';

import { noteService } from "../note-services/note-service.js";
import { eventBus } from "../../../main-services/eventbus-service.js"

export default {
    template: `
    <section v-if="note">
        <form @submit.prevent class="note-edit form-review">
            <div class="edit-inputs">
                <input type="text" placeholder="Title" v-model="note.title" ref="titleInput">
                <textarea v-if="note.type!=='img'" class="input-text" cols="30" :rows="textAreaSize(note.type)" v-model="note.data" :placeholder="placeholderTxt(note.type)"></textarea>
                <input v-if="note.type==='img'" type="url" placeholder="Enter image URL">
                <button @click="addTodo" type="button" v-if="note.type==='todo'">Add Todo</button>
                <p v-if="note.editedAt" class="edited-at">Last edit at:{{note.editedAt}}</p>
            </div>
            <div>
                <label for="pin">PIN</label>
                <input id="pin" type="checkbox" v-model="note.isPinned">
            </div>
            <div class="note-checks" v-if="!noteId">
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
            <div class="add-btns">
            <button @click="onSaveNote" class="add-btn">Save</button>
            <button type="button" @click="onDeleteNote" class="add-btn">Delete</button>
            </div>
        </form>
    </section>
    `,
    data() {
        return {
            noteId: '',
            note: null,
            todos: []

        }
    },
    methods: {
        addTodo() {
            if (!this.note.todos) this.note.todos = []
            this.note.todos.push(this.note.data)
            this.note.data = ''
        },
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
                    data: '',
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
                        data: '',
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
        textAreaSize(noteType) {
            let rowCount;
            if (noteType === 'txt') rowCount = 3
            else rowCount = 1
            return rowCount
        },
        placeholderTxt(noteType) {
            let placeholder;
            if (noteType === 'txt') placeholder = 'text'
            else placeholder = 'todo'

            return `Enter ${placeholder} here`
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