var socket = io.connect('http://localhost:5555',{reconnection:false});
const userName = document.querySelector('.userName').value
const textarea = document.querySelector('#textarea')
const messageArea = document.querySelector('.message-area')


textarea.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
        var message = e.target.value    
        let msg = {
            name : userName,
            message : message.trim()
        }
        appendChild(msg,'outgoing')
        socket.emit('sendMsg',msg)
        textarea.value=''
        messageArea.scrollTop = messageArea.scrollHeight
    }   
})

function appendChild(msg,type){
    const newDiv = document.createElement('div')
    newDiv.classList.add(type,'message')
    const appendMsg = `
        <h4>${msg.name} ${formatAMPM(new Date)}</h4>
        <p>
            ${msg.message}
        </p>
    `
    newDiv.innerHTML = appendMsg
    messageArea.appendChild(newDiv)    
}
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


socket.on('receiveMsg',msg=>{
    appendChild(msg,'incoming')
    messageArea.scrollTop = messageArea.scrollHeight
})