'use strict';
import { noteService } from '../note-services/note-service.js';
import { eventBus } from "../../../main-services/eventbus-service.js"
import userMsg from "../../../main-cmps/user-msg.cmp.js"
import noteList from '../note-cmps/note-list.cmp.js';
import noteFilter from '../note-cmps/note-filter.cmp.js';
import navBar from '../../../main-cmps/main-header.cmp.js';

//wanna try to change note bcg color opacity only
// ==================================
// on emit to mail app compose wont fill the form at all
//======================================

export default {
  template: `
    <section class="keep-app">
      <user-msg></user-msg>
      <nav-bar :currApp="'missKeep'"></nav-bar>
      <div class="top-wrapper">
        <router-link class="add-note" to="/note/edit">Add a note</router-link>
        <note-filter class="note-filter" @filtered="setFilter"></note-filter>
      </div>
      <note-list :notes="notesToShow"></note-list>
    </section>
    `,
  data() {
    return {
      notes: [],
      filterBy: null,
    }
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy
    },
    saveAsNote(mail) {
      var note = {
        title: mail.subject,
        data: mail.body,
        isPinned: false,
        type: 'txt',
        editedAt: new Date().toLocaleString(),
        bcgColor: ''
      }
      noteService.saveNote(note)
    },
    markAsDone(todoData) {
      noteService.toggleIsDone(todoData.todoId, todoData.noteTodos)
    }
  },
  computed: {
    notesToShow() {
      if (!this.filterBy) return this.notes;
      var regex = new RegExp(`${this.filterBy.title}`, 'i');
      return this.notes.filter(note => {
        if (this.filterBy.type) {
          return regex.test(note.title) && note.type === this.filterBy.type
        }
        else return regex.test(note.title)
      })
    }
  },
  created() {
    eventBus.$on('saveAsNote', this.saveAsNote)
    eventBus.$on('markedAsDone', this.markAsDone)
    noteService.getNotes()
      .then(notes => this.notes = notes)
  },
  components: {
    noteList,
    noteFilter,
    userMsg,
    navBar
  }
}


