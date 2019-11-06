'use strict';
import {noteService} from '../note-services/note-service.js';
import noteList from '../note-cmps/note-list.cmp.js';

export default {
  template: `
    <section class="keep-app">
      <router-link to="/note/edit">add a note</router-link>
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
    noteService.getNotes()
    .then(notes => this.notes=notes )
  },
  components: {
    noteList,
  }
}


