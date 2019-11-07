
export default {
    template: `
        <div class="email-filter">
            <input @input="setFilter" type="search" class="form-control"
             placeholder="Search Email" v-model="filterBy.title" />
            <select @change="setFilter" v-model="filterBy.read">
            <option value="" >All</option>
            <option value="true">Read</option>
            <option value="false">unRead</option>
            </select>
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                read: ''
            }
        }
    },
    methods: {
        setFilter(){
            this.$emit('filtered', this.filterBy)
        }
    }
}