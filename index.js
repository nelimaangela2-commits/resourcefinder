const search = document.getElementById("search");
const dropdown = document.getElementById("dropdown");
const items = document.querySelectorAll(".item");

//Show dropdown when input is focused
search.addEventListener("focus", () => {
    dropdown.style.display = "block";
});

//Hide dropdown when clicking outside 
document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-container")) {
        dropdown.style.display = "none";
    }
});

// Put selected item into search box 
items.forEach(item => {
    item.addEventListener("click", () => {
        search.value = item.textContent;
        dropdown.style.display = "none";
    });
});

//search button
document.getElementById("searchBtn").addEventListener("click", () => {
    alert("Searching for: " + search.value);
});

const dropdownItems = document.querySelectorAll(".dropdown .item");
const resourceCards = document.querySelectorAll(".resource-card");

dropdownItems.forEach(item => {

    item.addEventListener("click", function () {

        const selectedCategory = this.textContent.toLowerCase();

        resourceCards.forEach(card => {

            const category = card.dataset.category.toLowerCase();

            if (category === selectedCategory) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});

//Select all "Add to favorites" buttons on the page
const favoriteButtons = document.querySelectorAll(".favoritesBtn")

//Loop through each button
favoriteButtons.forEach(button => {
    
    //Listen for a click on the button
    button.addEventListener("click", () => {

        //Find the reource card that contains the clicked button
        const card = button.closest(".resource-card");

        //Create an oject containing the resource information
        const resource = {
            title: card.querySelector("h3").textContent,
            description: card.querySelector("p").textContent
        };

        let favorites = JSON.parse(localStorage.getItem("favorites")) ǀǀ [];

        // Check whether theresource is already in favorites
        const exists = favorites.some(item => item.title === resource.title);

        if(!exists) {
            //Add the new resource to the array
            favorites.push(resource);

            //Save the updated array
            localStorage.setItem("favorites", JSON.stringify(favorites));

            alert("Added to favorites");
        } else{
            alert("This resource is already in your favorites");
        }
    });
});