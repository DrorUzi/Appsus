'use strict';
import previewBottomPanel from '../note-cmps/note-bottom-panel.cmp.js';
import previewTopPanel from '../note-cmps/note-top-panel.cmp.js';


export default {
    props: ['note'],
    template: `
    <div class="note-preview" @mouseenter="togglePanel(true)" @mouseleave="togglePanel(false)">
        <preview-top-panel :currNote="note" :isMouseIn ="isMouseIn"></preview-top-panel>
        <img class="note-preview-img" :src="note.data" :alt="note.title+' Image'" title="Appsus">
        <preview-bottom-panel :currNote="note" :isMouseIn ="isMouseIn"></preview-bottom-panel>
    </div>
    `,
    data() {
        return {
            isMouseIn: false,
        }
    },
    methods: {
        togglePanel(isMouseIn) {
            this.isMouseIn = isMouseIn
        },


    },
    computed: {
        hidden() {
            return (this.isMouseIn) ? '' : 'hidden';
        }

    },
    created() {

    },
    components: {
        previewTopPanel,
        previewBottomPanel,
    }
}