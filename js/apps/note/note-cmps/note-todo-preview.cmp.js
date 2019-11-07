'use strict';
import { noteService } from '../note-services/note-service.js';


export default {
    props: ['note'],
    template: `
    <div class="note-preview">
        <h2>Title: {{note.title}}</h2>
        <ul>
            <li :class="isDone(noteTodo)" v-for="noteTodo in note.todos">
                {{noteTodo.txt}}
            </li>
        </ul>
        <router-link class="edit-link add-btn" :to="'/note/edit/'+note.id">edit</router-link>
    </div>
    `,
    data() {
        return {

        }
    },
    methods: {
        isDone(todo) {

            if (todo.isDone) {
                return 'done-todo'
            }
            // var currTodo = noteService.findTodoById(todoId,todos)
            // console.log(currTodo);

        }

    },
    computed: {


    },
    created() {

    }
}