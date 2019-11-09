'use strict';
import { noteService } from '../note-services/note-service.js';
export default {
    props: ['currNote', 'isMouseIn'],
    template: `
    <section class="preview-bottom-panel">
        <router-link class="edit-link" :to="'/note/edit/'+currNote.id">edit</router-link>
        <i @click="sendAsEmail" class="fas fa-paper-plane preview-icon" :class="hidden"></i>
            <div>
                <label for="preview-color"><i class="fas fa-fill-drip preview-icon" :class="hidden"></i></label>
                <input @change="saveChanges" class="hide" id="preview-color" type="color" v-model="currNote.bcgColor">
            </div>
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        //bug with checkbox/input hack, if checkbox not visable dosent work!

        saveChanges() {
            noteService.saveNotesToStorage()
        },

        sendAsEmail() {
            Swal.fire({
                title: 'Do you want to send by Email?',
                text:'You will be redirected to another page',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.value) {
                    console.log('pp')

                }
            })
        }



    },
    computed: {
        hidden() {
            return (this.isMouseIn) ? '' : 'hidden';
        }

    },
    created() {

    }
}


