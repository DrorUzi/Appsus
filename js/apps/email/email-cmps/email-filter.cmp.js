
export default {
    template: `
        <div class="email-filter">
            <h2>Search</h2>
            <input type="search" placeholder="Search Email" v-model="filterBy.title" />
            <select v-model="filterBy.read">
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
    created() {
        this.$emit('filtered', this.filterBy)
    }
}