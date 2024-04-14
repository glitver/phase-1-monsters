const URL_PREFIX = 'http://localhost:3000/';

const getMonsters = (page) => {
    fetch(`${URL_PREFIX}monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
            monsters.forEach(monster => {
                createMonsterCard(monster);
            });
        });
};

const createMonsterCard = (monster) => {
    const monsterContainer = document.querySelector('#monster-container');
    const monsterCard = document.createElement('div');
    monsterCard.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>
    `;
    monsterContainer.appendChild(monsterCard);
};

const createMonsterForm = () => {
    const form = document.createElement('form');
    form.id = 'monster-form';
    form.innerHTML = `
        <input id="name" placeholder="Name">
        <input id="age" placeholder="Age">
        <input id="description" placeholder="Description">
        <button type="submit">Create Monster</button>
    `;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            age: parseFloat(document.getElementById('age').value),
            description: document.getElementById('description').value
        };
        postNewMonster(formData);
        clearForm();
    });
    document.getElementById('create-monster').appendChild(form);
};

const postNewMonster = (data) => {
    fetch(`${URL_PREFIX}monsters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(newMonster => console.log('New monster created:', newMonster))
    .catch(error => console.error('Error creating monster:', error));
};

const addNavListeners = () => {
    const backButton = document.querySelector('#back');
    const forwardButton = document.querySelector('#forward');

    backButton.addEventListener('click', () => {
        if (page > 1) {
            page--;
            getMonsters(page);
        } else {
            alert('Ain\'t no monsters here');
        }
    });

    forwardButton.addEventListener('click', () => {
        page++;
        getMonsters(page);
    });
};

const init = () => {
    getMonsters(1);
    createMonsterForm();
    addNavListeners();
};

document.addEventListener('DOMContentLoaded', init);
