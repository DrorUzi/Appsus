'use strict';
import utilsService from '../../../main-services/utils-service.js';

export const noteService = {
    getNotes,
    findNoteById,
    saveNote,
    deleteNote,
    findTodoById,
    saveNotesToStorage
}

const NOTES_KEY = 'notes'
var gNotes;

function findNoteById(noteId) {
    var selectedNote = gNotes.find(note => note.id === noteId)
    return Promise.resolve(selectedNote)
}

function _createNoteTodo(todos) {
    var newTodos = todos.map(todo => {
        return {
            todoId: utilsService.makeId(),
            txt: todo,
            isDone: false
        }
    })
    return newTodos
}

function findTodoById(todoId, todos) {
    var currTodo = todos.find(todo => todo.todoId === todoId)
    return currTodo
}

function saveNote(note, noteId) {
    if (!noteId) {
        var newNote = note
        if (note.type === 'todo') {
            newNote.todos =  _createNoteTodo(newNote.todos)
        }
        newNote.id = utilsService.makeId()
        gNotes.unshift(newNote)
    }
    else {
        var newNote = findNoteById(noteId)
            .then(noteToEdit => {
                noteToEdit = note
                noteToEdit.id = noteId
            })
    }
    utilsService.saveToStorage(NOTES_KEY, gNotes)
    return Promise.resolve(newNote)
}

function deleteNote(noteId) {
    var selectedNoteIdx = gNotes.findIndex(note => note.id === noteId)
    gNotes.splice(selectedNoteIdx, 1)
    utilsService.saveToStorage(NOTES_KEY, gNotes)
    return Promise.resolve('note deleted successfully')
}

var defaultNotes = [
    {
        id: utilsService.makeId(),
        title: 'img',
        data: 'https://imgcomfort.com/Userfiles/Upload/images/illustration-geiranger.jpg',
        isPinned: false,
        type: 'img',
        editedAt: 'today',
        bcgColor:''
    },
    {
        id: utilsService.makeId(),
        title: 'txt',
        data: 'lala',
        isPinned: false,
        type: 'txt',
        editedAt: 'today',
        bcgColor:''
    },
    {
        id: utilsService.makeId(),
        title: 'todo',
        data: '',
        todos: [
            {
                todoId: utilsService.makeId(),
                txt: 'eat',
                isDone: true
            },
            {
                todoId: utilsService.makeId(),
                txt: 'sleep',
                isDone: true
            },
            {
                todoId: utilsService.makeId(),
                txt: 'repeat',
                isDone: false
            },
        ],
        isPinned: true,
        type: 'todo',
        editedAt: 'today',
        bcgColor:''
    },
]
_loadGNotes()

function _loadGNotes() {
    if (!utilsService.loadFromStorage(NOTES_KEY)) {
        gNotes = defaultNotes
        utilsService.saveToStorage(NOTES_KEY, gNotes)
    }
    else {
        gNotes = utilsService.loadFromStorage(NOTES_KEY)
    }
}

function saveNotesToStorage(){
    utilsService.saveToStorage(NOTES_KEY, gNotes)
}

function getNotes() {
    return Promise.resolve(gNotes)
}


