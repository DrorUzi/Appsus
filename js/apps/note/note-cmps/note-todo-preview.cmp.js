'use strict';
import { noteService } from '../note-services/note-service.js';
import previewTopPanel from '../note-cmps/note-top-panel.cmp.js';
import previewBottomPanel from '../note-cmps/note-bottom-panel.cmp.js';


export default {
    props: ['note'],
    template: `
    <div class="note-preview" @mouseenter="togglePanel(true)" @mouseleave="togglePanel(false)">
        <img class="pin-img" src="img/pin.png">
        <preview-top-panel :currNote="note" :isMouseIn ="isMouseIn"></preview-top-panel>
        <ul class="todo-list">
            <li v-for="todo in note.todos" :key="todo.todoId" :class="isDone(todo)" @click="markAsDone(todo.todoId)">
                {{todo.txt}}
            </li>
        </ul>
        <preview-bottom-panel :currNote="note" :isMouseIn ="isMouseIn"></preview-bottom-panel>
    </div>
    `,
    data() {
        return {
            isMouseIn: false,
        }
    },
    methods: {
        isDone(todo) {
            return (todo.isDone)? 'done-todo' : ''
        },
        togglePanel(isMouseIn) {            
            this.isMouseIn = isMouseIn
        },
        markAsDone(todoId){
            let currTodo = noteService.findTodoById(todoId,this.note.todos)
            currTodo.isDone = !currTodo.isDone;
        }

    },
    computed: {


    },
    created() {

    },
    components:{
        previewTopPanel,
        previewBottomPanel,
    }
}
