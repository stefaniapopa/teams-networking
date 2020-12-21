console.log('test script');

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
    </tr>`;
}

let allPersons = [];

fetch('team.json')
    .then(res => res.json())
    .then(data => {
        allPersons = data;
        insertPersons(data);
    });

function searchPersons(text){
    text = text.toLowerCase();
    console.warn('ai cautat', text, allPersons);
    return allPersons.filter(person =>{
        console.log(person.firstName);
        return person.firstName.toLowerCase().indexOf(text) > -1 ||
        person.lastName.toLowerCase().indexOf(text) > -1 ;
    });
}

const search = document.getElementById('search');
search.addEventListener('input', e => {
    const text = e.target.value
    
    const filtrate = searchPersons(text);

    insertPersons(filtrate);
})



function addRow() {
    var newRaw = document.getElementById('list');
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var link = document.getElementById("link").value;
    var row = newRaw.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = firstName;
    cell2.innerHTML = lastName;
    cell3.innerHTML = link;
}


var input = document.getElementById('link');
input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("myBtn").click();
    }
    else if (event.keyCode === 8) {
        event.preventDefault();
        document.getElementById("dlt").click();
    }
});


function deleteRow() {
    document.getElementById("list").deleteRow(-1);
}
