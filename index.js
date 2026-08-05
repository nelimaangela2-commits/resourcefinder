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


//get the search input field
const searchInput = document.getElementById("search");

//Get all resource cards
const resourceCards = document.querySelectorAll(".resource-card");

//Listen for every key the user types
searchInput.addEventListener("input", () => {

    //Get the text entered by the user
    //Convert it to lowercase so the search is not case-sensitive
    const searchTerm = searchInput.value.toLowerCase().trim();

    //Loop thrught all resource cards
    resourceCards.forEach(card => {

        //Convert it to lowercase
        const cardText = card.textContent.toLowerCase();

        //Check if the card contains the search text
        if (cardText.includes(searchTerm)) {
            //Show the card if it matches
            card.style.display = "block";
        } else {
            //Hide the card if it doesn't match
            card.style.display = "none";
        }
    });
});