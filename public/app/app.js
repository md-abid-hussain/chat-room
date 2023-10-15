const socket = io()

const msgInput = document.querySelector('#message')
const nameInput = document.querySelector('#name')
const roomInput = document.querySelector('#room')

const activityState = document.querySelector('.activity')
const welcome = document.querySelector('.welcome')
const chatArea = document.querySelector('.chat-area')
const userList = document.querySelector('.user-list')
const roomList = document.querySelector('.room-list')

function sendMessage(e) {
    e.preventDefault()
    console.log(msgInput.value)
    if (nameInput.value && roomInput.value && msgInput.value) {
        socket.emit('message',{
            name:nameInput.value,
            text:msgInput.value
        })
        msgInput.value = ""
    }
    msgInput.focus()
}

function enterRoom(e){
    e.preventDefault()
    if (nameInput.value && roomInput.value){
        socket.emit('enterRoom',{
            name:nameInput.value,
            room:roomInput.value
        })
    }
}

document.querySelector('.form-message')
    .addEventListener('submit', sendMessage)

document.querySelector('.form-join')
    .addEventListener('submit',enterRoom)
msgInput.addEventListener('keypress',()=>{
    socket.emit('activity',nameInput.value)
})

// Listen for messages 
socket.on("chat message", ( data ) => {
    activityState.textContent=''
    const li = document.createElement('li')

    const user = document.createElement('span')
    user.classList.add('user')
    user.innerText = data.name + ' : '

    const message = document.createElement('span')
    message.classList.add('message')
    message.innerText = data.text

    li.appendChild(user)
    li.appendChild(message)
    chatArea.appendChild(li)
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('activity',(name)=>{
    activityState.textContent = `${name} is typing.....`
    setTimeout(()=>{
        activityState.textContent = ''
    },3000)
})

socket.on('message',(data)=>{
    const li = document.createElement('li')
    li.textContent = data
    chatArea.appendChild(li)
})

socket.on('disconnect',(data)=>{
    console.log('ddd')
    const li = document.createElement('li')
    li.textContent = data
    chatArea.appendChild(li)
})