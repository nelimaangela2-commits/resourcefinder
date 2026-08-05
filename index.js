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


// Get every "Add to Favorites" button
const favoriteButtons = document.querySelectorAll(".favorite-btn");

// Loop through each button
favoriteButtons.forEach(button => {

    // Wait for the button to be clicked
    button.addEventListener("click", () => {

        // Get the resource card that contains this button
        const card = button.closest(".resource-card");

        // Get the resource title
        const title = card.querySelector(".resource-title").textContent;

        // Get the resource description
        const description = card.querySelector(".resource-description").textContent;

        // Create an object to store the resource information
        const resource = {
            title,
            description
        };

        // Get the current favorites from localStorage
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        // Check if the resource is already in favorites
        const alreadyExists = favorites.some(item => item.title === title);

        if (!alreadyExists) {

            // Add the resource to the favorites array
            favorites.push(resource);

            // Save the updated array back to localStorage
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }

        // Change the button text
        button.textContent = "Added to Favorites";

        // Disable the button so it can't be clicked again
        button.disabled = true;

    });

});