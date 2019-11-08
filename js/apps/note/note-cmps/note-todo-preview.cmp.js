'use strict';
import { noteService } from '../note-services/note-service.js';


export default {
    props: ['note'],
    template: `
    <div class="note-preview">
        <h2>Title: {{note.title}}</h2>
        <ul class="todo-list">
            <li v-for="todo in note.todos" :key="todo.todoId" :class="isDone(todo)" @click="markAsDone(todo.todoId)">
                {{todo.txt}}
            </li>
        </ul>
        <router-link class="edit-link" :to="'/note/edit/'+note.id">edit</router-link>
    </div>
    `,
    data() {
        return {

        }
    },
    methods: {
        isDone(todo) {
            return (todo.isDone)? 'done-todo' : ''
        },
        markAsDone(todoId){
            let currTodo = noteService.findTodoById(todoId,this.note.todos)
            currTodo.isDone = !currTodo.isDone;
        }

    },
    computed: {


    },
    created() {

    }
}