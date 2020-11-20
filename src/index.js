let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");

  const addToyForm = document.querySelector(".add-toy-form")
  // we added some of our DOM elements to the starter code


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // our event listeners
  toyCollection.addEventListener("click", addLikes)
  addToyForm.addEventListener("submit", submitToy)

  function submitToy(event) {
    event.preventDefault()

    const newToy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newToy),
    })
      .then(response => response.json())
      .then(data => {
        createToys(newToy)
        console.log('Success:', data);
      })



    event.target.reset()
  }

  function addLikes(event) {
    if (event.target.matches(".like-btn")) {
      const card = event.target.closest(".card")
      const pTag = card.querySelector("p")
      const newLikes = parseInt(pTag.textContent) + 1
      pTag.textContent = `${newLikes} Likes`
      const id = card.dataset.id

      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ likes: newLikes }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
    }
  }

  const initialize = () => {

    fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(toysArray => {
        toysArray.forEach(toy => {
          createToys(toy)
        })
        console.log(toysArray)
      });
  }

  initialize()

  function createToys(toyObj) {
    const div = document.createElement("div")
    div.className = "card"
    div.dataset.id = toyObj.id
    div.innerHTML = `<h2>${toyObj.name}</h2>
  <img src=${toyObj.image} class="toy-avatar" />
  <p>${toyObj.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  `
    toyCollection.append(div)
  }

});


