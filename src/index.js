const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divCollect = document.querySelector('#toy-collection')

// YOUR CODE HERE

fetch('http://localhost:3000/toys')
.then((res) => {return res.json()})
.then((data) => {
  data.forEach((toy)=>{
    //function to render toys goes here or something
    renderToys(toy)

  }

);})

function renderToys(toy){

let h2 =  document.createElement('h2')
h2.innerText = toy.name

let img = document.createElement('img')
img.setAttribute('src',toy.image)
img.setAttribute('class','toy-avatar')

let p = document.createElement('p')
p.innerText = `${toy.likes} likes`


let btn = document.createElement('button')
btn.setAttribute('class','like-btn')
btn.setAttribute('id',toy.id)
btn.innerText = "like"
btn.addEventListener('click',(e)=>{
  console.log(e.target.dataset);
  //some function to add likes or whatever
  likes(e)
})

let divCard =  document.createElement('div')
divCard.setAttribute('class','card')

divCard.append(h2,img,p,btn)

divCollect.append(divCard)


}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit',(e)=> {
      e.preventDefault()
      fetch('http://localhost:3000/toys',{
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": e.target.name.value,
          "image": e.target.image.value,
          "likes" : 0

        })
      })
      .then((res) => {return res.json()})

      .then((obj_toy)=>{

        let new_toy = renderToys(obj_toy)
        divCollect.append(new_toy)

      })

    })
  } else {
    toyForm.style.display = 'none'
  }
})

function likes(e){
e.preventDefault()
let more = parseInt(e.target.previousElementSibling.innerText)+1

fetch(`http://localhost:3000/toys/${e.target.id}`,{
  method:"PATCH",
  headers:{
    "Content-Type": "application/json",
    "Accept": "application/json"

  },
  body: JSON.stringify({
    "likes": more
  })
})
.then((res)=>{res.json()})
.then((like_obj=>{
  e.target.previousElementSibling.innerText =  `${more} likes`
}))

}//function ends


// OR HERE!
