'use strict';

export default {
    template: `
    <div class="note-filter">
    <h3>Filter Notes</h3>
    <input type="search" placeholder="Search by Title" v-model="filterBy.title" />
    <select v-model="filterBy.type">
    <option value="" >All</option>
    <option value="txt">Text</option>
    <option value="img">Image</option>
    <option value="todo">Todo</option>
    </select>
    </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                type: ''
            }
        }
    },
    methods: {


    },
    computed: {


    },
    created() {
        this.$emit('filtered', this.filterBy)
    }
}