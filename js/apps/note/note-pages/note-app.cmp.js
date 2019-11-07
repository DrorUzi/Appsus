'use strict';
import { noteService } from '../note-services/note-service.js';
import noteList from '../note-cmps/note-list.cmp.js';
import noteFilter from '../note-cmps/note-filter.cmp.js';

export default {
  template: `
    <section class="keep-app">
      <router-link class="add-note" to="/note/edit">Add a note</router-link>
      <note-filter @filtered="setFilter"></note-filter>
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
    }
  },
  computed: {
    notesToShow() {      
      if (!this.filterBy) return this.notes;
      var regex = new RegExp(`${this.filterBy.title}`, 'i');
      return this.notes.filter(note => {
        if(this.filterBy.type){
          return regex.test(note.title) && note.type === this.filterBy.type
        }
        else return regex.test(note.title)
      })
    }

  },
  created() {
    noteService.getNotes()
      .then(notes => this.notes = notes)
  },
  components: {
    noteList,
    noteFilter
  }
}


