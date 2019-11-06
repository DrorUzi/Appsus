'use strict';
import utilsService from '../../../main-services/utils-service.js';

export const noteService = {
    getNotes,
    findNoteById,
    saveNote,
}

function findNoteById(noteId) {
    var selectedNote = gNotes.find(note => note.id === noteId)
    return Promise.resolve(selectedNote)
}

function saveNote(note, noteId) {
    if (!noteId) {
        let newNote = note
        newNote.id = utilsService.makeId()
        gNotes.unshift()
    }
    else {
        findNoteById(noteId)
            .then(noteToEdit => {
                noteToEdit = note
                noteToEdit.id = noteId
                console.log(gNotes);
            })
    }
}

var gNotes = [
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

function getNotes() {
    return Promise.resolve(gNotes)
}

// var emptyNote = {
//     title,
//     isPinned: false,
//     type: 'img OR txt OR todo',
//     editedAt: 'date'

// }

