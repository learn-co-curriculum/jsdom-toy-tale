let addToy = false;
const toyDisplay = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")

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

fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toyCollection => {
    toyCollection.forEach(toy => renderToy(toy))
  })

function renderToy(toy) {
  const div = document.createElement("div")
  const h2 = document.createElement("h2")
  const img = document.createElement("img")
  const p = document.createElement("p")
  const button = document.createElement("button")
  div.className = "card"
  div.dataset.id = toy.id
  img.src = toy.image
  img.className = "toy-avatar"
  p.innerHTML = `<span class="number-likes">${toy.likes}</span> likes`
  button.className = "like-btn"
  button.textContent = "Like <3"
  h2.textContent = toy.name
  div.append(h2, img, p, button)
  toyDisplay.append(div)
}

toyForm.addEventListener("submit", (event) => {
  event.preventDefault()

  const name = event.target.name.value
  const image = event.target.image.value

  const newToy = {
    name: name,
    image: image,
    likes: 0
  }

  fetch('http://localhost:3000/toys', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newToy),
  })
    .then(response => response.json())
    .then(returnedToy => {
      console.log('Success:', returnedToy);
      renderToy(returnedToy)
    })
    .catch((error) => {
      console.error('Error:', error);
    });


  event.target.reset()
})

toyDisplay.addEventListener("click", (event) => {
  if (event.target.className === "like-btn") {
    const card = event.target.closest(".card")
    const likes = card.querySelector(".number-likes")
    likes.textContent = parseInt(likes.textContent) + 1

    fetch(`http://localhost:3000/toys/${card.dataset.id}`, {
      method: 'PATCH', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"likes": likes.textContent}),
    })
      .then(response => response.json())
      .then(returnedToy => {
        console.log('Success:', returnedToy);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
})