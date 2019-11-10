'use strict';

import previewTopPanel from '../note-cmps/note-top-panel.cmp.js';
import previewBottomPanel from '../note-cmps/note-bottom-panel.cmp.js';
import longTxt from '../note-cmps/long-txt.cmp.js';

export default {
    props: ['note'],
    template: `
    <div class="note-preview" @mouseenter="togglePanel(true)" @mouseleave="togglePanel(false)">
        <img class="pin-img" src="img/pinned2.png">
        <preview-top-panel :currNote="note" :isMouseIn ="isMouseIn"></preview-top-panel>
        <long-txt :txt="note.data"></long-txt>
        <preview-bottom-panel :currNote="note" :isMouseIn ="isMouseIn"></preview-bottom-panel>
    </div>
    `,
    data() {
        return {
            isMouseIn: false,
            
        }
    },
    methods:{
        togglePanel(isMouseIn) {
            this.isMouseIn = isMouseIn
        },

    },
    computed: {

       
    },
    created() {

    },
    components:{
        previewTopPanel,
        previewBottomPanel,
        longTxt
    }
}


