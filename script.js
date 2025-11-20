import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, Timestamp, collection, addDoc, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class ChatUI {
    constructor(list) {
        this.list = list;
    }

    clear() {
        this.list.innerHTML = "";
    }

    render(data) {
        const when = data.created_at.toDate();
        const time = when.toLocaleString('pl-PL');

        const li = document.createElement('li');
        li.classList.add('list-group-item');

        const usernameSpan = document.createElement('span');
        usernameSpan.classList.add('username', 'fw-bold');
        usernameSpan.textContent = `${data.username}: `;

        const messageSpan = document.createElement('span');
        messageSpan.classList.add('message');
        messageSpan.textContent = data.message;

        const timeDiv = document.createElement('div');
        timeDiv.classList.add('time', 'small', 'text-muted', 'text-end');
        timeDiv.textContent = time;

        li.appendChild(usernameSpan);
        li.appendChild(messageSpan);
        li.appendChild(timeDiv);

        this.list.appendChild(li);
    }
}

class ChatRoom {
    constructor(username, room) {
        this.username = username;
        this.room = room;
        this.chatsRef = collection(db, 'chats');
        this.unsub = null;
    }

    async addChat(message) {
        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: Timestamp.fromDate(now)
        };
        const response = await addDoc(this.chatsRef, chat);
        return response;
    }

    getChats(callback) {
        if (this.unsub) {
            this.unsub();
        }

        const q = query(
            this.chatsRef,
            where('room', '==', this.room),
            orderBy('created_at')
        );

        this.unsub = onSnapshot(q, snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    callback(change.doc.data());
                }
            });
        });
    }

    updateName(username) {
        this.username = username;
        localStorage.setItem('username', username);
    }

    updateRoom(room) {
        this.room = room;
        console.log(`Zmieniono pokój na ${room}`);
    }
}

const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const roomsContainer = document.querySelector('.chat-rooms');
const notification = document.getElementById('notification');

let notificationTimer = null;

const username = localStorage.getItem('username') ? localStorage.getItem('username') : 'anonim';
const chatUI = new ChatUI(chatList);
const chatRoom = new ChatRoom(username, 'general');

chatRoom.getChats(data => chatUI.render(data));

function showNotification(message, duration = 3000) {
    clearTimeout(notificationTimer);

    notification.textContent = message;
    notification.classList.add('show');

    notificationTimer = setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    if (message.length) {
        chatRoom.addChat(message)
            .then(() => newChatForm.reset())
            .catch(err => console.log(err));
    }
});

newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    if (newName.length) {
        chatRoom.updateName(newName);
        newNameForm.reset();
        showNotification(`Nazwa zaktualizowana na: ${newName}`);
    }
});

roomsContainer.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const newRoom = e.target.getAttribute('id');

        roomsContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        chatRoom.updateRoom(newRoom);
        chatUI.clear();
        chatRoom.getChats(data => chatUI.render(data));
    }
});