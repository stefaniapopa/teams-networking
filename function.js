console.log('test script');

function insertPersons(person){
    
    var tbody = document.querySelector('#list tbody');
    tbody.innerHTML = getPersonsHtml(person);
}

function getPersonsHtml(person){
    return getPersonHtml(person[0]) + getPersonHtml(person[1]);
}

function getPersonHtml(person){ 
    var link = person.link;
    return `<tr>
        <td>${person.firstName}</td>
        <td>${person.lastName}</td>
        <td><a target="_blank" href="https://github.com/${link}" class="fa fa-github" aria-hidden="true"></a></td>
        <td><a target="_blank" href="https://www.linkedin.com/in/${link}/" class="fa fa-linkedin"></a></td>
    </tr>`;
}


fetch('team.json')
    .then(res => res.json())
    .then(data =>  {
            insertPersons(data);
    });