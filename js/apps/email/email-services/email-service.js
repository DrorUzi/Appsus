'use strict';

import utilsService from '../../../main-services/utils-service.js';

export default {
    getEmails,
    findEmailById
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

function findEmailById(id) {
    var email = gEmails.find(email => {
        return email.id === id
    });
    utilsService.saveToStorage(EMAILS_KEY, gEmails)
    return Promise.resolve(email)
}


var starterEmails = [
    {
        name:'Moshe',
        id: utilsService.makeId(),
        subject: 'Hello',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'noa@gmail.com',
        sentFrom: 'moshe@gmail.com',
        isRead: true,
        isMarked: true,
        sentAt:new Date().toLocaleString()


    },
    {
        name:'Ori',
        id: utilsService.makeId(),
        subject: 'App',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'Dror@gmail.com',
        sentFrom: 'Ori@gmail.com',
        isRead: false,
        isMarked: true,
        sentAt:new Date().toLocaleString()

    },
    {
        name:'Dror',
        id: utilsService.makeId(),
        subject: 'Meeting',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'ori@gmail.com',
        sentFrom: 'dror@gmail.com',
        isRead: true,
        isMarked: false,
        sentAt:new Date().toLocaleString()

    },
    {
        name:'Dror',
        id: utilsService.makeId(),
        subject: 'Mail',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'Ori@gmail.com',
        sentFrom: 'Dror@gmail.com',
        isRead: true,
        isMarked: true,
        sentAt:new Date().toLocaleString()

    },

]