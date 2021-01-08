const API = {
    CREATE: {
        URL: "create.json",
        METHOD: "GET" // POST
    },
    READ: {
        URL: "team.json",
        METHOD: "GET"
    },
    UPDATE: {
        URL: "",
        METHOD: "GET"
    },
    DELETE: {
        URL: "",
        METHOD: "GET"
    }
};

API.READ.URL

function insertPersons(persons) {
    var tbody = document.querySelector('#list tbody');
    tbody.innerHTML = getPersonsHtml(persons);
}

function getPersonsHtml(persons) {
    return persons.map(getPersonHtml).join('');
}

function getPersonHtml(person) {
    var link = person.link;
    return `<tr>
        <td>${person.firstName}</td>
        <td>${person.lastName}</td>
        <td><a target="_blank" href="https://github.com/${person.gitHub}" class="fa fa-github" aria-hidden="true"> </a>
        <a target="_blank" href="https://www.linkedin.com/in/${link}/" class="fa fa-linkedin"></a></td>
        <td></td>
    </tr>`;
}

let allPersons = [];

function loadList() {
    fetch(API.READ.URL)
    .then(res => res.json())
    .then(data => {
        allPersons = data;
        insertPersons(data);
    });
}

loadList();

function searchPersons(text){
    text = text.toLowerCase();
    console.warn('ai cautat', text, allPersons);
    return allPersons.filter(person =>{
        return person.firstName.toLowerCase().indexOf(text) > -1 ||
        person.lastName.toLowerCase().indexOf(text) > -1 ;
    });
}

const search = document.getElementById('search');
search.addEventListener('input', e => {
    const text = e.target.value
    
    const filtrate = searchPersons(text);

    insertPersons(filtrate);
});

function saveTeamMembers(){
    const firstName = document.querySelector('input[name=firstName]').value;
    const lastName = document.querySelector('input[name=lastName]').value;
    const gitHub = document.querySelector('input[name=gitHub]').value;

    const person ={
        firstName,
        lastName,
        gitHub
    };
    console.log('saving', person);

    fetch(API.CREATE.URL, {
        method: API.CREATE.METHOD,
        body: API.CREATE.METHOD === "GET" ?  null : JSON.stringify(person)
    })
        .then(res => res.json())
        .then(r => {
            console.warn(r);
            if( r.success){
                alert('saving data..., please wait until we are ready.');
                    console.log("refresh list");
                    loadList();               
            
            } 
        });
}

const saveBtn = document.querySelector('#list button');
saveBtn.addEventListener('click', () => {
    saveTeamMembers();
});


