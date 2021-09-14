const wordsContainer = document.getElementById('words-table');

async function fetchInfo(word){
    return await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+word)
    .then(res => res.json());
}

async function fetchWords () {
    return await fetch('https://random-word-api.herokuapp.com//word')
    .then(res => res.json());
};

let WordObj = class WordObj{
    
    constructor(id,word,pos,def){
        this.id = id;
        this.word = word;
        this.pos = pos;
        this.def = def;
    }

    returnNode(){
        
        let wordRow = document.createElement('tr');

        //ID CELL
        let idCell = document.createElement('td');

        idCell.innerHTML = this.id;
        wordRow.appendChild(idCell);
        
        //WORD CELL
        let wordCell = document.createElement('td');

        wordCell.innerText = this.word;
        wordRow.appendChild(wordCell);
        
        // PARTOFSPEECH CELL
        let posCell = document.createElement('td');
        let posList = document.createElement('ul');

        this.pos.forEach(element => {
            let posElement = document.createElement('li');
            posElement.innerHTML = element;
            posList.appendChild(posElement);
        });
        posCell.appendChild(posList);
        wordRow.appendChild(posCell);


        //DEFININTIONS CELL
        let defCell = document.createElement('td');
        let defList = document.createElement('ul');

        this.def.forEach(element => {
            let defElement = document.createElement('li');
            defElement.innerHTML = element;
            defList.appendChild(defElement);
        });
        defCell.appendChild(defList);
        wordRow.appendChild(defCell);

        //BUTTON CELL
        let btnCell = document.createElement('td');
        let btn = document.createElement('button');
        btn.className = "btn btn-primary" ;
        btn.innerText = 'test';
        btnCell.appendChild(btn);
        wordRow.appendChild(btnCell);

        btn.addEventListener("click", () => {
            this.displayInfo();
        })

        return wordRow;
    }

    displayInfo(){
        console.log(this.word, this.pos, this.def);
    }
}




const showWords = async() =>{
    let i = 0;

    wordList = [];


    while( i< 10){
        //retrive word
        let word = await fetchWords();
        //retrive word info
        let wordInfo = await fetchInfo(word);
        //check if word existe
        if(wordInfo.title) console.log('err');
        else{
            i+=1;
            
            //create word id
            let id = i;

            //create pos list
            let posList = [];
            wordInfo[0].meanings.forEach(element => { posList.push(element.partOfSpeech)})

            //create definitions list
            let defList = [];
            wordInfo[0].meanings.forEach(element => { defList.push(element.definitions[0].definition)})

            wordobj = new WordObj(i,word, posList, defList)

            wordList.push(wordobj);
        }
    }

    wordList.forEach(element => {
        wordsContainer.appendChild(element.returnNode())
    });


}

showWords();