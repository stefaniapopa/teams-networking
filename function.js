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
        <td><a target="_blank" href="https://github.com/${person.gitHub}" class="fa fa-github" aria-hidden="true"></a></td>
        <td><a target="_blank" href="https://www.linkedin.com/in/${link}/" class="fa fa-linkedin"></a></td>
    </tr>`;
}

fetch('team.json')
    .then(res => res.json())
    .then(data =>  {
            insertPersons(data);
    });
   
function addRow(){
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

function deleteRow() {
    document.getElementById("list").deleteRow(-1);
}
 