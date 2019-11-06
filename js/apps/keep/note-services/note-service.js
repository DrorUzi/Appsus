'use strict';

export const noteService = {
    getNotes
}

var gNotes = [
    {
        title: 'img',
        isPinned: false,
        type: 'img',
        editedAt: 'today'
    },
    {
        title: 'txt',
        isPinned: false,
        type: 'txt',
        editedAt: 'today'
    },
    {
        title: 'todo',
        isPinned: true,
        type: 'todo',
        editedAt: 'today'
    },
]

function getNotes(){
    return gNotes
}

// var emptyNote = {
//     title,
//     isPinned: false,
//     type: 'img OR txt OR todo',
//     editedAt: 'date'

// }

