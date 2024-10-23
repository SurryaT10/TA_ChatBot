const messages = [];

function getMessage(e) {
    e.preventDefault();

    const queryInput = document.querySelector('#query');
    const query = queryInput.value;
    addMessage(query, false);
    queryInput.value = '';

    // Send a POST request to the server
    fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
        try {
            const query = JSON.parse(data.message).message;
            addMessage(query);
        } catch (e) {
            addMessage(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function addMessage(message, isBot = true) {
    // Get the messages container
    const messagesContainer = document.getElementById('messages');

    // Create a new message div
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    if (!isBot) {
        messageDiv.innerHTML = `
        <div>
            <p>${message}</p>
        </div>
    `;
    } else {
        messageDiv.innerHTML = `
        <div>
            <img src="../images/hugo.png" alt="hugo-image" id="hugo-img">
        </div>
        <div>
            <p>${message}</p>
        </div>
    `;
    }

    // Append the new message to the container
    messagesContainer.appendChild(messageDiv);
    messagesContainer.appendChild(document.createElement('hr')); // Add a horizontal line

    // Automatically scroll to the bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    messages.push({
        message,
        person: isBot ? 'MechHugo' : 'Student'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // query form on submit
    const queryForm = document.getElementById('chat-form');
    queryForm.addEventListener('submit', getMessage);
});