document.addEventListener("DOMContentLoaded", function() {
    fetchDogs();
});

function fetchDogs() {
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(data => renderDogs(data))
};

function dogToggle(id) {
    let goodDogButton = document.getElementById("good-dog-button");
    let newValue;
    if (goodDogButton.innerText.includes("Good")) {
        goodDogButton.innerText = "Bad Dog!"
        newValue = false
    } else {
        goodDogButton.innerText = "Good Dog!"
        newValue = true
    }
    toggleGoodDog(id, newValue)
}

function toggleGoodDog(id, newValue) {
    fetch(`http://localhost:3000/pups/${id}` , {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: newValue
        })
    })
};

function handleDogClick(event) {
    let isGoodDog = (event.target.props);
    let dogInfo = document.getElementById("dog-info");
    let dogCard = document.createElement("div");
    dogCard.id = (event.target.id);
    dogCard.innerHTML=`
    <img src=${event.target.image}>
    <h2>${event.target.innerHTML}</h2>
    <button onclick="dogToggle(${dogCard.id})" id="good-dog-button">${isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>`
    dogInfo.appendChild(dogCard);
};

function renderDogs(dogs) {
    let dogBar = document.getElementById("dog-bar");
    dogs.forEach(dog => {
       let card = document.createElement("span");
       card.innerHTML=`${dog.name}`;
       card.id=`${dog.id}`; 
       card.image=`${dog.image}`;
       card.props= dog.isGoodDog;
       card.addEventListener("click", handleDogClick);
       dogBar.appendChild(card);
    })
}