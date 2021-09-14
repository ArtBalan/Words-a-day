const wordsContainer = document.getElementById('words-container');


let wordsList;

const fetchWords = async()  => {
    wordsList = await fetch('https://random-word-api.herokuapp.com//word?number=10')
    .then(res => res.json());
};

const showWords = async() =>{
    await fetchWords();

    wordsList.forEach(word => {

        let wordBox = document.createElement('li');
        wordBox.classList.add('word-box');
        wordBox.innerHTML = word;

        wordsContainer.appendChild(wordBox);
    });




}

showWords();