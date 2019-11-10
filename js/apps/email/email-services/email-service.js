'use strict';

import utilsService from '../../../main-services/utils-service.js';

export default {
    getEmails,
    findEmailById,
    deleteEmail,
    getUnreadMails,
    changeToRead,
    sendMail,
    getStaredEmails,
    getDraftEmails,
    saveDraft,
    getInbox,
    getDeletedEmails,
    getSentEmails,
    changeToStared
}

var gEmails;
const EMAILS_KEY = 'emails'

function getInbox() {
    var inbox = gEmails.filter(email => {
        return !email.isDraft && !email.isDeleted
    })
    return Promise.resolve(inbox)
}

function deleteEmail(id) {
    var email = gEmails.find(email => {
        return email.id === id
    })
    email.isDeleted = true
    utilsService.saveToStorage(EMAILS_KEY, gEmails)
    return Promise.resolve()
}

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
    return Promise.resolve(email)
}

function getUnreadMails() {
    var res = 0
    gEmails.forEach(email => {
        if (!email.isRead) res++
    })
    return Promise.resolve(res)
}

function sendMail(newEmail) {
    newEmail.id = utilsService.makeId()
    gEmails.push(newEmail)
    utilsService.saveToStorage(EMAILS_KEY, gEmails)

}

function changeToRead(emailId) {
    var currEmail = gEmails.find(email => {
        return email.id === emailId
    })
    currEmail.isRead = !currEmail.isRead
    utilsService.saveToStorage(EMAILS_KEY, gEmails)
}
function changeToStared(emailId){
    var currEmail = gEmails.find(email => {
        return email.id === emailId
    })
    currEmail.isStared = !currEmail.isStared
    utilsService.saveToStorage(EMAILS_KEY, gEmails)
}

function getStaredEmails() {
    var emails = gEmails.filter(email => email.isStared)
    return Promise.resolve(emails)
}

function getDraftEmails() {
    var emails = gEmails.filter(email => email.isDraft)
    return Promise.resolve(emails)
}

function getDeletedEmails() {
    var emails = gEmails.filter(email => email.isDeleted)
    return Promise.resolve(emails)
}

function saveDraft(saveDraft) {
    saveDraft.id = utilsService.makeId()
    saveDraft.isDraft = true
    gEmails.push(saveDraft)
    utilsService.saveToStorage(EMAILS_KEY, gEmails)

}

function getSentEmails() {
    var emails = gEmails.filter(email => email.isSent)
    return Promise.resolve(emails)
}


var starterEmails = [
    {
        name: 'Moshe',
        id: utilsService.makeId(),
        subject: 'Hello how are you?',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'noa@gmail.com',
        sentFrom: 'moshe@gmail.com',
        isRead: false,
        isMarked: true,
        sentAt: new Date().toLocaleString(),
        isStared: false,
        isDraft: false,
    },
    {
        name: 'Ori',
        id: utilsService.makeId(),
        subject: 'App',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'Dror@gmail.com',
        sentFrom: 'Ori@gmail.com',
        isRead: false,
        isMarked: true,
        sentAt: new Date().toLocaleString(),
        isStared: false,
        isDraft: false,


    },
    {
        name: 'Dror',
        id: utilsService.makeId(),
        subject: 'Meeting',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'ori@gmail.com',
        sentFrom: 'dror@gmail.com',
        isRead: false,
        isMarked: false,
        sentAt: new Date().toLocaleString(),
        isStared: true,
        isDraft: false,


    },
    {
        name: 'Roy',
        id: utilsService.makeId(),
        subject: 'Mail',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'Ori@gmail.com',
        sentFrom: 'Dror@gmail.com',
        isRead: true,
        isMarked: true,
        sentAt: new Date().toLocaleString(),
        isStared: false,
        isDraft: true,


    },
    {
        name: 'Dror',
        id: utilsService.makeId(),
        subject: 'Meeting is coming',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'ori@gmail.com',
        sentFrom: 'dror@gmail.com',
        isRead: true,
        isMarked: false,
        sentAt: new Date().toLocaleString(),
        isStared: true,
        isDraft: false,


    },
    {
        name: 'Moshe',
        id: utilsService.makeId(),
        subject: 'Meeting is coming',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'ori@gmail.com',
        sentFrom: 'dror@gmail.com',
        isRead: false,
        isMarked: false,
        sentAt: new Date().toLocaleString(),
        isStared: false,
        isDraft: true,


    },
    {
        name: 'Dror',
        id: utilsService.makeId(),
        subject: 'Meeting is coming',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'ori@gmail.com',
        sentFrom: 'dror@gmail.com',
        isRead: false,
        isMarked: false,
        sentAt: new Date().toLocaleString(),
        isStared: false,
        isDraft: true,


    },
    {
        name: 'Rony',
        id: utilsService.makeId(),
        subject: 'Meeting',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'ori@gmail.com',
        sentFrom: 'dror@gmail.com',
        isRead: true,
        isMarked: false,
        sentAt: new Date().toLocaleString(),
        isStared: true,
        isDraft: false,


    },
    {
        name: 'Dror',
        id: utilsService.makeId(),
        subject: 'Meeting',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum harum ipsum ab, quaerat nulla animi hic pariatur voluptatem, deserunt eligendi optio dolorum eveniet ipsam sed dignissimos id explicabo adipisci laudantium!',
        sentTo: 'ori@gmail.com',
        sentFrom: 'dror@gmail.com',
        isRead: false,
        isMarked: false,
        sentAt: new Date().toLocaleString(),
        isStared: false,
        isDraft: false,
    },

]