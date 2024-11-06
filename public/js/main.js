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
        try {
            const query = JSON.parse(data.message);
            addMessage(query);
        } catch (e) {
            addMessage(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function addMessage(data, isBot = true) {
    console.log(data);
    // Get the messages container
    const messagesContainer = document.getElementById('messages');

    // Create a new message div
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    let suggestedCourses = '';
    if (data.suggested_courses?.length > 0) {
        suggestedCourses += '<dl>';
        for (let i = 0; i < data.suggested_courses.length; i++) {
            suggestedCourses += `
                <dt>
                    ${data.suggested_courses[i].course}
                </dt>
                <dd>
                    ${data.suggested_courses[i].reason}
                </dd>`;
        }
        suggestedCourses += '</dl>';
    }

    let message = isBot ? `<div>
            <img src="../images/hugo.png" alt="hugo-image" id="hugo-img">
        </div>` : '';

    message += `<div>
            <p>${data.message ?? data}</p>
            ${suggestedCourses}
        </div>`;

    messageDiv.innerHTML = message;

    // Append the new message to the container
    messagesContainer.appendChild(messageDiv);
    messagesContainer.appendChild(document.createElement('hr')); // Add a horizontal line

    // Automatically scroll to the bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    messages.push({
        message: data,
        person: isBot ? 'MechHugo' : 'Student'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // query form on submit by clicking on the send icon
    const queryForm = document.getElementById('chat-form');
    queryForm.addEventListener('submit', getMessage);

    // query form on submit by pressing enter key
    document.getElementById("query").addEventListener("keydown", function(event) {
        // Check if the Enter key is pressed without the Shift key
        if (event.key === "Enter" && !event.shiftKey) {
          getMessage(event);
        }
    });

    // Resizable textarea based on the content
    const textarea = document.getElementById('query');

      const autoResize = () => {
        textarea.style.height = '23px';  // Reset to default height
        textarea.style.height = `${textarea.scrollHeight}px`;  // Set to scrollHeight to show content
      };

      // Attach autoResize to the input event to adjust on content change
      textarea.addEventListener('input', autoResize);

      // Initial call to autoResize in case there's pre-filled content
      autoResize();
});