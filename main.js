const wordsContainer = document.getElementById('words-table');

async function fetchInfo(word){
    return await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+word)
    .then(res => res.json());
}

async function fetchWords () {
    return await fetch('https://random-word-api.herokuapp.com//word')
    .then(res => res.json());
};

const showWords = async() =>{
    await fetchWords();
    let i = 0;

    while( i< 10){
        let wordRow = document.createElement('tr');
        
        
        let word = await fetchWords();

        let wordInfo = await fetchInfo(word);

        if(wordInfo.title) console.log('err');
        else{
            i+=1;
            
            // ID CELL
            let idCell = document.createElement('td');
            idCell.innerText = i;
            wordRow.appendChild(idCell);

            // WORD CELL
            let wordCell = document.createElement('td');
            wordCell.innerText = word;
            wordRow.appendChild(wordCell);

            // PARTOFSPEECH CELL
            let meanings = wordInfo[0].meanings;

            let posCell = document.createElement('td');
            let posList = document.createElement('ul');

            meanings.forEach(element => {
                let posElement = document.createElement('li');
                posElement.innerHTML = element.partOfSpeech;
                posList.appendChild(posElement);
            });
            posCell.appendChild(posList);
            wordRow.appendChild(posCell);


            //DEFININTIONS CELL
            let defCell = document.createElement('td');
            let defList = document.createElement('ul');

            meanings.forEach(element => {
                let defElement = document.createElement('li');
                defElement.innerHTML = element.definitions[0].definition;
                defList.appendChild(defElement);
            });
            defCell.appendChild(defList);
            wordRow.appendChild(defCell);



            // ADDING ROW TO TABLE
            wordsContainer.appendChild(wordRow);
        }
    }
}

showWords();