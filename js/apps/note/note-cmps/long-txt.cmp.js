'use strict';

export default {
    props: ['txt'],
    template: `
    <div>
        <p v-if ="!isReadMore">{{checkTxtLength}}</p>
        <p v-if ="isReadMore">{{txt}}</p>
        <button class="show-more-btn" v-if="isTxtLong" @click="showFullTxt">{{btnTxtSwap}}</button>
    </div>
    `,
    data() {
        return {
            isTxtLong: false,
            isReadMore: false
        }
    },
    methods: {
        showFullTxt() {
            this.isReadMore = !this.isReadMore
        },
        showBtn() {
            this.isTxtLong = true
        }
    },
    computed: {
        checkTxtLength() {
            if (this.txt.length < 100) return this.txt
            else {
                this.showBtn()
                return this.txt.substring(0, 100)
            }
        },
        btnTxtSwap() {
            if (!this.isReadMore) return 'Read more'
            else return 'Read less'
        }
    },
}
