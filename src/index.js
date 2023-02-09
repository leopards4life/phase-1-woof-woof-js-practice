document.addEventListener("DOMContentLoaded", function() {
    fetchDogs();
});

function fetchDogs() {
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(data => renderDogs(data))
};

function dogToggle(id, isGoodDog) {
    let goodDogButton = document.getElementById("good-dog-button");
    if (goodDogButton.innerHTML === "Bad Dog!") {
        goodDogButton.innerHTML = "Good Dog!"
    } else goodDogButton.innerHTML = "Bad Dog!";
    fetch(`http://localhost:3000/pups/${id}` , {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "isGoodDog": isGoodDog ? false : true
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
    <button onclick="dogToggle(${dogCard.id}, ${isGoodDog})" id="good-dog-button">${isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>`
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