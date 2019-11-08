
export default {
    template: `
        <div class="email-filter">
        <router-link to="/email/compose"  >
            <div class="compose-btn">
                <img src="../../../img/email/compose.png">
                <span>COMPOSE</span>
            </div>
        </router-link>
        <div class="main-filter-container">
            <div class="filter-container">
                <input @input="setFilter" type="search" class="form-control"
                placeholder="Search Email" v-model="filterBy.title" />
                <select @change="setFilter" v-model="filterBy.read">
                    <option value="" >All</option>
                    <option value="true">Read</option>
                    <option value="false">unRead</option>
                </select>
            </div>
            <div class="sort-container">
                <h6>Sort By:</h6> 
                <span @click="setSort('title')">Title</span>
                <span @click="setSort('date')">Date</span>
            </div>
            </div>
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
        setFilter() {
            this.$emit('filtered', this.filterBy)
        },
        setSort(sortBy){
            this.$emit('sort',sortBy)
        }
    }
}