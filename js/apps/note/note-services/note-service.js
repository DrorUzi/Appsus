'use strict';
import utilsService from '../../../main-services/utils-service.js';

export const noteService = {
    getNotes,
    findNoteById,
    saveNote,
    deleteNote,
    toggleIsDone,
    saveNotesToStorage,
    createNoteTodo
}

const NOTES_KEY = 'notes'
var gNotes;

function findNoteById(noteId) {
    var selectedNote = gNotes.find(note => note.id === noteId)
    return Promise.resolve(selectedNote)
}

function createNoteTodo(todos, isNew) {
    if (isNew) {
        var newTodos = todos.map(todo => {
            return {
                todoId: utilsService.makeId(),
                txt: todo,
                isDone: false
            }
        })
    }
    else {
        return {
            todoId: utilsService.makeId(),
            txt: todos,
            isDone: false
        }
    }
    return newTodos
}

function toggleIsDone(todoId, todos) {
    var currTodo = todos.find(todo => todo.todoId === todoId)
    currTodo.isDone = !currTodo.isDone
    saveNotesToStorage()
}

function saveNote(note, noteId) {
    if (!noteId) {
        var newNote = note
        if (note.type === 'todo') {
            newNote.todos = createNoteTodo(newNote.todos, true)
        }
        newNote.id = utilsService.makeId()
        Vue.set(newNote, '', newNote.todos)
        gNotes.unshift(newNote)
    }
    else {
        var newNote = findNoteById(noteId)
            .then(noteToEdit => {
                noteToEdit = note
                noteToEdit.id = noteId
            })
    }
    saveNotesToStorage()
    return Promise.resolve(newNote)
}

function deleteNote(noteId) {
    var selectedNoteIdx = gNotes.findIndex(note => note.id === noteId)
    gNotes.splice(selectedNoteIdx, 1)
    saveNotesToStorage()
    return Promise.resolve('note deleted successfully')
}

var defaultNotes = [
    {
        id: utilsService.makeId(),
        title: 'look issadog',
        data: 'https://media.tenor.com/images/1690cb57b451cc488ad63e63042215e9/tenor.gif',
        isPinned: false,
        type: 'img',
        editedAt: 'today',
        bcgColor: ''
    },
    {
        id: utilsService.makeId(),
        title: 'view from house after coding',
        data: 'https://imgcomfort.com/Userfiles/Upload/images/illustration-geiranger.jpg',
        isPinned: false,
        type: 'img',
        editedAt: 'today',
        bcgColor: ''
    },
    
   
    {
        id: utilsService.makeId(),
        title: 'Life',
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
                isDone: false
            },
            {
                todoId: utilsService.makeId(),
                txt: 'repeat',
                isDone: true
            },
        ],
        isPinned: false,
        type: 'todo',
        editedAt: 'today',
        bcgColor: ''
    },
    {
        id: utilsService.makeId(),
        title: 'Sprint',
        data: '',
        todos: [
            {
                todoId: utilsService.makeId(),
                txt: 'fix bugs',
                isDone: false
            },
            {
                todoId: utilsService.makeId(),
                txt: 'make pretty',
                isDone: false
            },
            {
                todoId: utilsService.makeId(),
                txt: 'responsive',
                isDone: false
            },
        ],
        isPinned: true,
        type: 'todo',
        editedAt: 'today',
        bcgColor: ''
    },
    {
        id: utilsService.makeId(),
        title: 'Grandma\'s cake',
        data: 'Sugar,Spice,And everything nice',
        isPinned: true,
        type: 'txt',
        editedAt: 'today',
        bcgColor: ''
    },
    
    {
        id: utilsService.makeId(),
        title: 'beutiful image',
        data: 'http://s6.favim.com/orig/65/logo-beautiful-text-Favim.com-592093.jpg',
        isPinned: true,
        type: 'img',
        editedAt: 'today',
        bcgColor: ''
    },
    {
        id: utilsService.makeId(),
        title: 'Me on sprint',
        data: 'https://media.giphy.com/media/klVA0qx4KW7kY/giphy.gif',
        isPinned: true,
        type: 'img',
        editedAt: 'today',
        bcgColor: ''
    },
    {
        id: utilsService.makeId(),
        title: 'pp',
        data: '',
        todos: [
            {
                todoId: utilsService.makeId(),
                txt: 'work',
                isDone: true
            },
            {
                todoId: utilsService.makeId(),
                txt: 'work',
                isDone: true
            },
            {
                todoId: utilsService.makeId(),
                txt: 'work',
                isDone: true
            },
            {
                todoId: utilsService.makeId(),
                txt: 'work',
                isDone: true
            },
            {
                todoId: utilsService.makeId(),
                txt: 'work',
                isDone: true
            },
        ],
        isPinned: false,
        type: 'todo',
        editedAt: 'today',
        bcgColor: ''
    },
    
]
_loadGNotes()

function _loadGNotes() {
    if (!utilsService.loadFromStorage(NOTES_KEY)) {
        gNotes = defaultNotes
        saveNotesToStorage()
    }
    else {
        gNotes = utilsService.loadFromStorage(NOTES_KEY)
    }
}

function saveNotesToStorage() {
    utilsService.saveToStorage(NOTES_KEY, gNotes)
}

function getNotes() {
    return Promise.resolve(gNotes)
}


