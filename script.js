document.getElementById('search-btn').addEventListener('click', () => {
    const word = document.getElementById('word-input').value;
    const resultDiv = document.getElementById('result');

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Word not found');
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                const meaning = data[0].meanings[0].definitions[0].definition;
                resultDiv.innerHTML = `<strong>Meaning:</strong> ${meaning}`;
                readAloud(meaning);
            } else {
                resultDiv.innerHTML = 'No definitions found.';
            }
        })
        .catch(error => {
            resultDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
        });
});

function readAloud(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}


