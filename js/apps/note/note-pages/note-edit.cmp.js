'use strict';
import { noteService } from "../note-services/note-service.js";
import { eventBus } from "../../../main-services/eventbus-service.js"

export default {
    template: `
    <section v-if="note">
        <form @submit.prevent="onSaveNote" class="note-edit">
            <div class="edit-inputs">
                <input class="edit-title-input" type="text" placeholder="Title" v-model="note.title" ref="titleInput">
                <textarea class="note-edit-textarea" ref="textArea" v-if="checkNoteTodo" cols="30" :rows="textAreaSize(note.type)" v-model="note.data" @keypress="checkIfEnter" :placeholder="placeholderTxt(note.type)"></textarea>
                <template v-if="isNoteTodo">
                    <textarea class="note-edit-textarea" v-for="currTodo in note.todos" cols="30" rows=1 v-model="currTodo.txt" placeholder="Todo"></textarea>
                    <textarea @keypress="checkIfEnter" class="note-edit-textarea" ref="todoTextArea" cols="30" rows=1 placeholder="Todo" v-model="note.data"></textarea>
                </template>
                <button @click="addTodo" class="edit-add-btn add-todo-btn" type="button" v-if="note.type==='todo'">Add Todo</button>
                <input v-if="note.type==='img'" type="url" placeholder="Enter image URL" class="url-input" v-model="note.data">
                <p v-if="note.editedAt" class="edited-at">Last edited at:{{note.editedAt}}</p>
                <ul v-if="newTodoNote"><li v-for="todo in this.note.todos">{{todo}}</li>
                </ul>
            </div>

            <div class="note-checks" v-if="!noteId">
                <div>
                    <label for="txt"><i class="fas fa-font" :class="{'icon-clicked':note.type==='txt'}"></i></label>
                <input class="hide" id="txt" type="radio" v-model="note.type" value="txt">
                </div>
                <div>
                    <label for="img"><i class="fas fa-image" :class="{'icon-clicked':note.type==='img'}"></i></label>
                    <input class="hide" id="img" type="radio" v-model="note.type" value="img">
                </div>
                <div>
                    <label for="todo"><i class="fas fa-list-ul" :class="{'icon-clicked':note.type==='todo'}"></i></label>
                    <input class="hide" id="todo" type="radio" v-model="note.type" value="todo">
                </div>
            </div> 
            <div class="pin-color-wrapper">
                <div>
                    <label for="pin"><i class="fas fa-thumbtack" :class="{'icon-clicked':note.isPinned}"></i></label>
                    <input id="pin" class="hide" type="checkbox" v-model="note.isPinned">
                </div>
                <div>
                    <label for="color"><i class="fas fa-fill-drip icon-clicked"></i></label>
                    <input class="hide" id="color" type="color" v-model="note.bcgColor">
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
            if(!this.note.data)return Swal.fire('Please write something')
            if (this.note.id) {
                var newTodo = noteService.createNoteTodo(this.note.data, false)
                this.note.todos.push(newTodo)
                this.note.data = ''
                noteService.saveNotesToStorage()
                this.$refs.todoTextArea.focus()
            }
            else {
                if (!this.note.todos) this.note.todos = []
                this.note.todos.push(this.note.data)
                this.note.data = ''
                this.$refs.textArea.focus()
            }
        },
        loadNote() {
            var idParam = this.$route.params.id
            if (idParam) {
                noteService.findNoteById(idParam)
                    .then(note => {
                        this.noteId = idParam
                        this.note = note
                    })
                    .catch(err => {
                        const msg = {
                            txt: `Error occured : (${err})`,
                            type: 'error'
                        }
                        eventBus.$emit('show-msg', msg);
                    })
            }
            else {
                this.noteId = ''
                this.note = {
                    title: '',
                    data: '',
                    isPinned: false,
                    type: 'txt',
                    editedAt: '',
                    bcgColor: ''
                }
            }
        },
        onSaveNote() {
            if ((!this.note.data) && (!this.note.title) && (!this.note.todos)) {
                return Swal.fire('Please fill ANYTHING')
            }
            this.note.editedAt = new Date().toLocaleString()
            noteService.saveNote(this.note, this.noteId)
                .then(() => {
                    this.note = {
                        title: '',
                        data: '',
                        isPinned: false,
                        type: 'txt',
                        editedAt: '',
                        bcgColor: ''
                    }
                    this.$router.push('/note');
                    const msg = {
                        txt: `Note added Successfully`,
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg);
                })
                .catch(err => {
                    const msg = {
                        txt: `Note not saved : (${err})`,
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg);
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
                            .then(msg => {
                                const userMsg = {
                                    txt: msg,
                                    type: 'success'
                                }
                                eventBus.$emit('show-msg', userMsg)
                            })
                            .catch(err => {
                                const msg = {
                                    txt: `Note not deleted : (${err})`,
                                    type: 'error'
                                }
                                eventBus.$emit('show-msg', msg);
                            })
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
        checkIfEnter(ev) {
            if (ev.keyCode === 13 && this.note.type === 'todo') {
                ev.preventDefault()
                this.addTodo()
            }
        }
    },
    computed: {
        isNoteTodo() {
            if (this.note.todos) {
                if (this.note.todos[0].todoId)
                    return true
            }
            else return false
        },
        checkNoteTodo() {
            if (this.note.todos) {
                if (this.note.todos[0].todoId)
                    return false
            }
            else if (this.note.type !== 'img') return true
        },
        newTodoNote() {
            return (!this.note.id) && (this.note.type === 'todo')
            // (this.note.todos)
        }
    },
    mounted() { },
    created() {
        this.loadNote()
    },
    watch: {
        '$route.params.id'() {
            this.loadNote();
            if (this.$refs) this.$refs.titleInput.focus()
        }
    }
}