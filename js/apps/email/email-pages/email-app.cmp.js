'use strict';

import emailList from '../email-cmps/email-list.cmp.js'
import sideBar from '../email-cmps/side-bar.cmp.js'
import emailFilter from '../email-cmps/email-filter.cmp.js'
import emailService from '../email-services/email-service.js'
import { eventBus } from '../../../main-services/eventbus-service.js'

export default {
  template: `
    <section class="email-app" >
      <div class="filter-container">
      <div class="filter-prev"> 
        </div>
        <email-filter @filtered="setFilter"></email-filter>
      </div>
        <div class="main-info">
          <side-bar :unRead="unRead"></side-bar>
            <router-view></router-view>
        </div>
    </section>
    `,
  data() {
    return {
      emails: [],
      unRead: null,
      filterBy: null,

    }
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy
      eventBus.$emit('emailToShow', this.newEmailsToShow)
    }
  },
  computed: {
   newEmailsToShow() {
      if (!this.filterBy) return this.emails;
      var regex = new RegExp(`${this.filterBy.title}`, 'i');
      var newEmails = this.emails.filter(email => {
        if (this.filterBy.read === 'true') {
          return regex.test(email.subject) && email.isRead
        }
        else if (this.filterBy.read === 'false') return regex.test(email.subject) && !email.isRead
        else return regex.test(email.subject)
      })
      return newEmails
    }
  },
  components: {
    emailList,
    sideBar,
    emailFilter
  },
  created() {
    emailService.getEmails()
      .then(emails => {
        this.emails = emails
      })
    eventBus.$on('read', (emailId) => {
      console.log('changing to read!')
      emailService.changeToRead(emailId)
      emailService.getUnreadMails()
        .then(res => {this.unRead = res})
      // emailService.getEmails().then(res => this.emails = res)
    })
    eventBus.$on('newMail', (newEmail) => {
      emailService.sendMail(newEmail)
    })
  },
  mounted() {
    emailService.getUnreadMails()
      .then(res => this.unRead = res)
  }

}


