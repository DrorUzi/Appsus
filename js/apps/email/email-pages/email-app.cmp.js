'use strict';

import emailList from '../email-cmps/email-list.cmp.js'
import sideBar from '../email-cmps/side-bar.cmp.js'
import emailFilter from '../email-cmps/email-filter.cmp.js'
import emailService from '../email-services/email-service.js'
import { eventBus } from '../../../main-services/eventbus-service.js'

export default {
  template: `
    <section class="email-app" >
         <side-bar :unRead="unRead"></side-bar>
         <email-filter @filtered="setFilter"></email-filter>
         <router-view></router-view>
    </section>
    `,
  data() {
    return {
      emails: [],
      unRead: null,
      filterBy: null,
      emailsToShow: []

    }
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy
      this.emailsToShow = this.getEmailsToShow()
      eventBus.$emit('emailToShow', this.emailsToShow)
    }
  },
  computed: {
    getEmailsToShow() {
      console.log(this.filterBy);
      if (!this.filterBy) return this.emails;
      var regex = new RegExp(`${this.filterBy.title}`, 'i');
      var newEmails = this.emails.filter(email => {
        console.log(email,'3');
        if (this.filterBy.type) {
          console.log('1',this.filterBy.type);
          return regex.test(email.subject) && email.isRead === this.filterBy.type
        }
        else {
          console.log('2',email.subject);
          return regex.test(email.subject)
        } 

      })
      console.log('aa',newEmails);
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
      emailService.changeToRead(emailId)
      emailService.getUnreadMails()
        .then(res => this.unRead = res)
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


