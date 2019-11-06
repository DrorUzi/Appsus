'use strict';


export default {
    saveToStorage,
    loadFromStorage,
    makeId
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    var value = JSON.parse(str)
    return value;
}


function makeId() {
    var text = "";
    var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 3; i++) {
        text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
}
