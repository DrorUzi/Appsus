'use strict';
import utilsService from '../../../main-services/utils-service.js';
import { noteService } from "../note-services/note-service.js";
import { eventBus } from "../../../main-services/eventbus-service.js"

export default {
    template: `
    <section v-if="note">
        <form @submit.prevent="onSaveNote" class="note-edit form-edit">
            <div class="edit-inputs">
                <input class="edit-title-input" type="text" placeholder="Title" v-model="note.title" ref="titleInput">
                <textarea ref="textArea" v-if="checkNoteTodo" cols="30" :rows="textAreaSize(note.type)" v-model="note.data" :placeholder="placeholderTxt(note.type)"></textarea>
                <template v-if="isNoteTodo">
                    <textarea v-for="currTodo in note.todos" cols="30" rows=1 v-model="currTodo.txt" placeholder="Todo"></textarea>
                </template>
                <input v-if="note.type==='img'" type="url" placeholder="Enter image URL" class="url-input" v-model="note.data">
                <button @click="addTodo" class="edit-add-btn add-todo-btn" type="button" v-if="todoBtn">Add Todo</button>
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
            <button class="edit-add-btn">Save</button>
            <button type="button" @click="onDeleteNote" class="edit-add-btn">Delete</button>
            </div>
        </form>
    </section>
    `,
    data() {
        return {
            noteId: '',
            note: null,
        }
    },
    methods: {
        //need to find a way to introduce the new notes to vue (observer)
        //todo preview works properly only after refresh
        //puttin on hold for the meanwhile,too much times wasted
        addTodo() {
            if (!this.note.todos) this.note.todos = []
            this.note.todos.push(this.note.data)
            this.note.data = ''
            this.$refs.textArea.focus()
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
        isNoteTodo() {
            if (this.note.todos) {
                if (this.note.todos[0].todoId)
                    return true
            }
            else return false
        },
        checkNoteTodo(){
            if(this.note.todos){
                if (this.note.todos[0].todoId)
                return false
            }
            else if(this.note.type!=='img') return true
        },
        todoBtn(){
            if(this.note.todos){
                if (this.note.todos[0].todoId)
                return false
            }
            else if (this.note.type === "todo") return true
            else return false
        }
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



// if (!this.note.todos) {
//     this.note.todos = []
//     this.note.todos.push(this.todos)
// }

// addTodo() {
//     this.todos.txt= this.note.data
//     this.todos.todoId = utilsService.makeId()
//     console.log(this.todos);

//     this.note.data = ''
//     if (!this.note.todos) {
//         this.note.todos = []
//         this.note.todos.push(this.todos)
//     }
//     else this.note.todos.push(this.todos)
//     this.todos.txt = ''
//     this.todos.todoId =''
// },