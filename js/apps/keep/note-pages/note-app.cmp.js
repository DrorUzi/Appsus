'use strict';
import {noteService} from '../note-services/note-service.js';
import noteList from '../note-cmps/note-list.cmp.js';

export default {
  template: `
    <section class="keep-app">
      <h1>KEEP APP</h1>
      <button>Add a note</button>
      <note-list :notes="notes"></note-list>
    </section>
    `,
  data() {
    return {
      notes: []   
    }
  },
  methods: {



  },
  computed: {


  },
  created() {
    this.notes = noteService.getNotes()
  },
  components: {
    noteList,
  }
}


