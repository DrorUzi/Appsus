'use strict';

import emailList from '../email-cmps/email-list.cmp.js'
import sideBar from '../email-cmps/side-bar.cmp.js'
import emailFilter from '../email-cmps/email-filter.cmp.js'
import emailService from '../email-services/email-service.js'
import { eventBus } from '../../../main-services/eventbus-service.js'
import navBar from '../../../main-cmps/main-header.cmp.js';

export default {
  template: `
    <section class="email-background">
      <nav-bar :currApp="'missEmail'"></nav-bar>
      <div class="email-app">
          <email-filter @sort="setSort" @filtered="setFilter"></email-filter>
          <div class="main-info">
            <side-bar  :unRead="unRead"></side-bar>
              <router-view></router-view>
          </div>
      </div>
    </section>
    `,
  data() {
    return {
      emails: [],
      unRead: null,
      filterBy: null,
      sortBy: [],
      stared :[]


    }
  },
  methods: {
    setFilter(filterBy) {
      this.filterBy = filterBy
      eventBus.$emit('emailToShow', this.newEmailsToShow)
    },
    setSort(sortBy) {
      this.sortBy = sortBy
      eventBus.$emit('sortedEmails', this.sort)

    },

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
    },
    sort() {
      if (!this.sortBy) return this.emails;
      if (this.sortBy === 'title') {
        var sortedByTitle = this.emails.sort((a, b) => {
          var titleA = a.subject.toUpperCase();
          var titleB = b.subject.toUpperCase();
          return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0
        })
        return sortedByTitle
      } else {
        var sortedByDate = this.emails.sort((a, b) => {
          return (a.sentAt > b.sentAt) ? -1 : (a.sentAt < b.sentAt) ? 1 : 0
        })
        return sortedByDate
      }
    },

  },
  components: {
    emailList,
    sideBar,
    emailFilter,
    navBar,
  },
  created() {
    emailService.getEmails()
      .then(emails => {
        this.emails = emails
      })
    eventBus.$on('read', (emailId) => {
      emailService.changeRead(emailId)
      emailService.getUnreadEmailsNum()
        .then(res => { this.unRead = res })
    })
    eventBus.$on('newMail', (newEmail) => {
      emailService.sendMail(newEmail)
    })
    eventBus.$on('newDraft', (newDraft) => {
      emailService.saveDraft(newDraft)
    })
    eventBus.$on('delete', () => {
      emailService.getInbox()
        .then(emails => {
          this.emails = emails
          eventBus.$emit('deletedMails', this.emails)
        })
    })
    eventBus.$on('star', (emailId) => {
      emailService.changeToStared(emailId)
      emailService.getStaredEmails()
        .then(res => { 
          eventBus.$emit('changeStar',res)
        })
    })


  },
  mounted() {
    emailService.getUnreadEmailsNum()
      .then(res => this.unRead = res)
  }

}


