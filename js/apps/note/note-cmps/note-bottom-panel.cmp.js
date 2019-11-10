'use strict';
import { noteService } from '../note-services/note-service.js';
import { eventBus } from "../../../main-services/eventbus-service.js"

export default {
    props: ['currNote', 'isMouseIn'],
    template: `
    <section class="preview-bottom-panel">
        <router-link class="edit-link" :to="'/note/edit/'+currNote.id">edit</router-link>
        <i @click="sendAsEmail" class="fas fa-paper-plane preview-icon" :class="hidden"></i>
            <div>
                <label :for="currNote.id+'2'"><i class="fas fa-fill-drip preview-icon" :class="hidden"></i></label>
                <input @change="saveChanges" class="hide" :id="currNote.id+'2'" type="color" v-model="currNote.bcgColor">
            </div>
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        saveChanges() {
            noteService.saveNotesToStorage()
        },

        getTodoAsTxt(todos) {
            var todosStr = todos.map(todo => {
                return todo.txt + '\n'
            })
            return todosStr
        },

        sendAsEmail() {
            Swal.fire({
                title: 'Do you want to send by Email?',
                text: 'You will be redirected to another page',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.value) {
                    var emailMsg = {
                        title: '',
                        txt: ''
                    }
                    if (this.currNote.type === 'txt') {
                        emailMsg.txt = this.currNote.data
                    }
                    else if (this.currNote.type === 'img') {
                        emailMsg.txt = 'Check out that image! : ' + this.currNote.data
                    }
                    else emailMsg.txt = 'Todos : \n' + this.getTodoAsTxt(this.currNote.todos)
                    emailMsg.title = this.currNote.title
                    eventBus.$emit('sendAsEmail', emailMsg)
                    this.$router.push({ path: '../email/compose/', query: { title: emailMsg.title, txt: emailMsg.txt } })
                }
            })
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


