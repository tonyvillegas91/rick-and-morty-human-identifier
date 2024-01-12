// Hacer una solicitud a la API de Rick and Morty
fetch('https://rickandmortyapi.com/api/character/')
    .then(response => response.json())
    .then(data => {
        // Manipular los datos y mostrarlos en la página
        const charactersContainer = document.getElementById('characters');

        data.results.forEach(character => {
            const characterDiv = document.createElement('div');
            characterDiv.classList.add('character');

            const image = document.createElement('img');
            image.src = character.image;
            image.alt = character.name;

            const name = document.createElement('p');
            name.textContent = character.name;

            const status = document.createElement('p');
            status.textContent = `Status: ${character.status}`;

            const species = document.createElement('p');
            species.textContent = `Species: ${character.species}`;

            characterDiv.appendChild(image);
            characterDiv.appendChild(name);
            characterDiv.appendChild(status);
            characterDiv.appendChild(species);

            charactersContainer.appendChild(characterDiv);
        });
    })
    .catch(error => console.error('Error al obtener datos de la API:', error));
