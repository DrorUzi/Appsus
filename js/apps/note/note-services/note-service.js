'use strict';
import utilsService from '../../../main-services/utils-service.js';

export const noteService = {
    getNotes,
    findNoteById,
    saveNote,
    deleteNote,
}

const NOTES_KEY = 'notes'
var gNotes;



function findNoteById(noteId) {
    var selectedNote = gNotes.find(note => note.id === noteId)
    return Promise.resolve(selectedNote)
}

function saveNote(note, noteId) {
    if (!noteId) {
        var newNote = note
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


var previewCmps = [
    {
        type: 'txt',
        

    },
]

var defaultNotes = [
    {
        id: utilsService.makeId(),
        title: 'img',
        txt: 'lala',
        isPinned: false,
        type: 'img',
        editedAt: 'today'
    },
    {
        id: utilsService.makeId(),
        title: 'txt',
        txt: 'lala',
        isPinned: false,
        type: 'txt',
        editedAt: 'today'
    },
    {
        id: utilsService.makeId(),
        title: 'todo',
        txt: 'lala',
        isPinned: true,
        type: 'todo',
        editedAt: 'today'
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

function getNotes() {
    return Promise.resolve(gNotes)
}
