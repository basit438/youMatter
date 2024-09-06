// Initialize Speech Recognition and Speech Synthesis
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
const synth = window.speechSynthesis;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const chatContainer = document.getElementById('chat-container');

recognition.lang = 'en-US';
recognition.interimResults = true; // Enable interim results to capture partial speech
recognition.continuous = false;

let isSpeaking = false;

// Event listeners for buttons
startButton.addEventListener('click', () => {
    recognition.start();
    addMessageToChat('Listening...', 'system-message');
});

stopButton.addEventListener('click', () => {
    recognition.stop();
    addMessageToChat('Stopped listening.', 'system-message');
});

recognition.onstart = () => {
    console.log('Speech recognition service has started');
};

recognition.onend = () => {
    console.log('Speech recognition service disconnected');
};

// Gradually display the user's spoken words
recognition.onresult = (event) => {
    let transcript = '';

    // Collect the spoken words
    for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + ' ';
    }

    if (event.results[0].isFinal) {
        const finalTranscript = event.results[0][0].transcript.toLowerCase();
        addMessageToChat(`You: ${finalTranscript}`, 'user-message');
        respondToQuery(finalTranscript);
    }
};

// Function to handle responses
function respondToQuery(query) {
    let responseText = '';

    // Greeting related queries
    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
        responseText = 'Hello! How can I assist you today? You can ask me about meditation, relaxation techniques, or anything related to mental and general health.';
    } else if (query.includes('how are you')) {
        responseText = 'I’m just a program, but I’m here to help! How can I assist you today?';

    // App related queries
    } else if (query.includes('what is this app') || query.includes('what does this app do')) {
        responseText = 'This app is designed to help you with meditation, relaxation techniques, and provide information related to mental and general health. You can ask me anything from how to meditate, to stress management techniques, and more!';
    } else if (query.includes('how can you help') || query.includes('what can you do')) {
        responseText = 'I can help guide you through meditation, provide relaxation tips, and answer questions about mental health, general wellness, and how to reduce stress. Feel free to ask me anything!';

    // Meditation and relaxation queries
    } else if (query.includes('how to meditate')) {
        responseText = 'To meditate, find a quiet and comfortable place, sit or lie down, close your eyes, and focus on your breath. Let go of any distractions and gently bring your focus back to your breathing.';
    } else if (query.includes('benefits of meditation')) {
        responseText = 'Meditation can help reduce stress, improve concentration, enhance self-awareness, and promote emotional health. It also helps in improving sleep and overall well-being.';
    } else if (query.includes('relaxation techniques')) {
        responseText = 'Some popular relaxation techniques include deep breathing exercises, progressive muscle relaxation, guided imagery, and mindfulness meditation. You can go to our relax and breathe section to perform some of these techniques.';
    } else if (query.includes('guided meditation')) {
        responseText = 'Guided meditation involves following along with a narrator who guides you through a meditation session. This can be done via apps, audio recordings, or live sessions.';
    } else if (query.includes('mindfulness exercises')) {
        responseText = 'Mindfulness exercises include practices like body scan meditation, mindful breathing, and mindful walking. These exercises help you stay present and fully engage with the current moment.';

    // Mental health related queries
    } else if (query.includes('how to reduce stress')) {
        responseText = 'To reduce stress, you can practice mindfulness meditation, engage in physical exercise, maintain a healthy diet, get adequate sleep, and use relaxation techniques like deep breathing or progressive muscle relaxation.';
    } else if (query.includes('mental health tips')) {
        responseText = 'For better mental health, try to stay physically active, eat a balanced diet, keep a consistent sleep schedule, practice mindfulness or meditation, and stay connected with friends and family.';
    } else if (query.includes('anxiety') || query.includes('how to deal with anxiety')) {
        responseText = 'To manage anxiety, you can try deep breathing exercises, mindfulness meditation, regular physical activity, and reducing caffeine intake. Seeking support from a mental health professional can also be helpful.';
    } else if (query.includes('how to sleep better')) {
        responseText = 'To improve your sleep, maintain a consistent sleep schedule, create a relaxing bedtime routine, avoid screens before bed, and try practicing meditation or deep breathing before sleeping.';
    
    // General health queries
    } else if (query.includes('general health tips') || query.includes('stay healthy')) {
        responseText = 'To maintain good general health, follow a balanced diet, stay physically active, get regular checkups, maintain good hygiene, and prioritize mental well-being along with physical health.';
    } else if (query.includes('exercise benefits')) {
        responseText = 'Regular exercise can improve your mood, increase energy levels, promote better sleep, support cardiovascular health, and enhance overall physical fitness.';
    } else if (query.includes('you matter') || query.includes('what is this app') || query.includes('tell me about this app')) {
        responseText = 'You Matter is an app designed to help you practice relaxation and breathing techniques, listen to calming music of your choice, and interact with an AI about mental and general health topics. You can explore various activities to reduce stress and enhance your well-being.';
    }
    else if (query.includes('how to eat healthy')) {
        responseText = 'To eat healthy, focus on incorporating fruits, vegetables, lean proteins, and whole grains into your diet. Minimize processed foods, sugar, and excessive fats, and stay hydrated by drinking plenty of water.';

    // Default response for unrecognized queries
    } else {
        responseText = 'Sorry, I didn’t understand that. Can you please ask something related to meditation, relaxation, mental health, or general wellness?';
    }

    speakResponse(responseText);
}


// Function to gradually speak responses and update the UI word by word
function speakResponse(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    const words = text.split(' ');  // Split the response into words
    let currentWordIndex = 0;
    const aiMessageElement = addMessageToChat('', 'ai-message');  // Create empty AI message

    isSpeaking = true;

    // Event fires whenever the speech synthesis speaks a word
    utterance.onboundary = (event) => {
        if (event.name === 'word' && currentWordIndex < words.length) {
            aiMessageElement.textContent += words[currentWordIndex] + ' ';  // Display the next word
            currentWordIndex++;
        }
    };

    utterance.onend = () => {
        console.log('SpeechSynthesisUtterance finished speaking.');
        isSpeaking = false;
    };

    synth.speak(utterance);
}

// Helper function to add a message to the chat container
function addMessageToChat(message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;  // Scroll to the bottom of the chat
    return messageElement;  // Return the element for further updates
}
// Array of suggestions
const suggestions = [
    ['How to meditate?', 'what is you matter?', 'What are the benefits of meditation?', 'How to reduce stress?', 'Relaxation techniques', 'How does meditation affect sleep?'],
    ['What are mindfulness exercises?', 'How to practice guided meditation?', 'How to improve mental health?', 'What is progressive muscle relaxation?', 'Tips for better sleep'],
    ['What is deep breathing?', 'How does meditation help anxiety?', 'How to practice mindful breathing?', 'What are stress management techniques?', 'How to stay positive?'],
    ['What are the benefits of relaxation?', 'How can I feel happier?', 'What is mindful walking?', 'How to reduce anxiety?', 'Tips for increasing focus through meditation']
];

// Function to randomly select and refresh the suggestions
function refreshSuggestions() {
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    const suggestionList = document.getElementById('suggestion-list');
    suggestionList.innerHTML = ''; // Clear existing suggestions

    // Add new suggestions
    suggestions[randomIndex].forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = suggestion;
        suggestionList.appendChild(listItem);
    });
}

// Event listener for the "Refresh Suggestions" button
document.querySelector('#refresh-button').addEventListener('click', refreshSuggestions);

