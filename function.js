const API = {
    CREATE: {
        URL: "http://localhost:3000//teams-json/create",
        METHOD: "POST"
    },
    READ: {
        URL: "http://localhost:3000/teams-json",
        METHOD: "GET"
    },
    UPDATE: {
        URL: "http://localhost:3000//teams-json/update",
        METHOD: "PUT"
    },
    DELETE: {
        URL: "http://localhost:3000/teams-json/delete",
        METHOD: "DELETE"
    }
};

function insertPersons(persons) {
    var tbody = document.querySelector('#list tbody');
    tbody.innerHTML = getPersonsHtml(persons);
}

function getPersonsHtml(persons) {
    return persons.map(getPersonHtml).join('');
}

function getPersonHtml(person) {
    const gitHub = person.gitHub
    return `<tr>
        <td>${person.firstName}</td>
        <td>${person.lastName}</td>
        <td><a target="_blank" href="https://github.com/${gitHub}" class="fa fa-github" aria-hidden="true"> </a>
        <td>
            <a href="#" class="delete-row" data-id="${person.id}">&#10006;</a>
        </td>
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

function searchPersons(text) {
    text = text.toLowerCase();
    console.warn('ai cautat', text, allPersons);
    return allPersons.filter(person => {
        return person.firstName.toLowerCase().indexOf(text) > -1 ||
            person.lastName.toLowerCase().indexOf(text) > -1;
    });
}

function saveTeamMembers() {
    const firstName = document.querySelector('input[name=firstName]').value;
    const lastName = document.querySelector('input[name=lastName]').value;
    const gitHub = document.querySelector('input[name=gitHub]').value;

    const person = {
        firstName,
        lastName,
        gitHub: gitHub
    };
    console.log('saving', person);

    fetch(API.CREATE.URL, {
        method: API.CREATE.METHOD,
        headers: {
            "Content-Type": "application/json"
        },
        body: API.CREATE.METHOD === "GET" ? null : JSON.stringify(person)
    })
        .then(res => res.json())
        .then(r => {
            console.warn(r);
            if (r.success) {
                loadList();

            }
        });
}

function deleteTeamMember(id) {
    fetch("http://localhost:3000/teams-json/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    });
}

function addEventListeners() {
    const search = document.getElementById('search');
    search.addEventListener('input', e => {
        const text = e.target.value

        const filtrate = searchPersons(text);
        console.log({ filtrate })

        insertPersons(filtrate);
    });

    const saveBtn = document.querySelector('#list tfoot button');
    saveBtn.addEventListener('click', () => {
        saveTeamMembers();
    });

    const table = document.querySelector('#list tbody');
    table.addEventListener('click', (e) => {
        const target = e.target;
        if (e.target.matches("a.delete-row")) {
            const id = target.getAttribute("data-id");
            deleteTeamMember(id)
        }
    });
}

addEventListeners();


