let addToy = false;
const newToyForm = document.querySelector('form.add-toy-form')
const toyCollectionDiv = document.querySelector('div#toy-collection')


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function renderOneToy(toy) {
  const div = document.createElement('div')
  div.classList.add('card')
  div.dataset.id = toy.id

  div.innerHTML = `
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>${toy.likes} Likes </p>
          <button class="like-btn" data-id=${toy.id}>Like <3</button>`


  const toyCollectionDiv = document.querySelector('div#toy-collection')
  toyCollectionDiv.append(div)
}


function renderAllToys() {
  fetch('http://localhost:3000/toys')
    .then(response => {
      // console.log(response)
      return response.json()
    })
    .then(toyArr => toyArr.forEach(renderOneToy))
}





newToyForm.addEventListener('submit', e => {
  e.preventDefault()
  // console.log(e.target)
  // debugger

  const nameInput = e.target.name.value
  const imageInput = e.target.image.value

  const configObject = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ name: nameInput, image: imageInput, likes: 0 })
  }

  fetch('http://localhost:3000/toys', configObject)
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(toy => {
      renderOneToy(toy)
    })

})


toyCollectionDiv.addEventListener('click', e => {
  if (e.target.classList.contains('like-btn')) {
    const pLikesDisplay = e.target.previousElementSibling
    const oldLikes = parseInt(pLikesDisplay.textContent)
    const newLikes = oldLikes + 1

    const configObject = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ likes: newLikes })
    }

    fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, configObject)
      .then(response => response.json())
      .then(data => {
        pLikesDisplay.textContent = `${data.likes} Likes`
      })
  }
})



/* APP INIT */
renderAllToys()