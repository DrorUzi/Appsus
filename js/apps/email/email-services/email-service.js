'use strict';

import utilsService from '../../../main-services/utils-service.js';

export default {
    getEmails
}

var gEmails;
const EMAILS_KEY = 'emails'

function getEmails() {
    var emails = utilsService.loadFromStorage(EMAILS_KEY)
    if (!emails || emails.length === 0) {
        emails = starterEmails
        utilsService.saveToStorage(EMAILS_KEY, emails)
    }
    gEmails = emails
    return Promise.resolve(gEmails)
}



var starterEmails = [
    {
        id: utilsService.makeId(),
        subject: 'Hello',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'AAA@gmail.com',
        sendFrom: 'Ori@gmail.com',
        isRead: true,
        isMarked: true,
        sentAt : Date.now()


    },
    {
        id: utilsService.makeId(),
        subject: 'App',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'Dror@gmail.com',
        sendFrom: 'Ori@gmail.com',
        isRead: false,
        isMarked: true,
        sentAt : Date.now()

    },
    {
        id: utilsService.makeId(),
        subject: 'Meeting',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'Dror@gmail.com',
        sendFrom: 'Ori@gmail.com',
        isRead: true,
        isMarked: false,
        sentAt : Date.now()

    },
    {
        id: utilsService.makeId(),
        subject: 'Mail',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'Dror@gmail.com',
        sendFrom: 'Ori@gmail.com',
        isRead: true,
        isMarked: true,
        sentAt : Date.now()

    },

]