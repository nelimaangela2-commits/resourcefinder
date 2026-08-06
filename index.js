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



// Impact section
const impact = document.getElementById("impact");

if (impact) {

    const counters = document.querySelectorAll(".counter");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                counters.forEach(counter => {

                    const target = Number(counter.dataset.target);
                    let current = 0;
                    const increment = target / 100;
                    const symbol = counter.dataset.symbol || "";

                    const updateCounter = () => {

                        if (current < target) {

                            current += increment;
                            counter.textContent = Math.ceil(current) + symbol;
                            requestAnimationFrame(updateCounter);

                        } else {

                            counter.textContent = target + symbol;

                        }

                    };

                    updateCounter();

                });

                observer.disconnect();

            }

        });

    });

    observer.observe(impact);

}

// Get the modal
const modal = document.getElementById("detailsModal");

// Get the close button
const closeBtn = document.querySelector(".close-btn");

// Get all View Details buttons
const buttons = document.querySelectorAll(".detailsBtn");

// Add a click event to every button
buttons.forEach(button => {

    button.addEventListener("click", function () {

        // Display the description
        document.getElementById("modalDescription").textContent =
            this.dataset.description;

        // Display the contact information
        document.getElementById("modalContact").textContent =
            this.dataset.contact;

        // Show the modal
        modal.style.display = "flex";
    });

});

// Close when X is clicked
closeBtn.addEventListener("click", function () {

     modal.style.display = "none";

});


// Close when clicking outside the popup
window.addEventListener("click", function (event) {

    if (event.target === modal) {
        modal.style.display = "none";
    }

});


// Select all Add to Favorites buttons
const favoriteButtons = document.querySelectorAll(".favoritesBtn");

// Add a click event to every button
favoriteButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Get the resource card
        const card = this.closest(".resource-card");

        // Create an object with the resource details
        const resource = {
            title: card.querySelector("h3").textContent,
            location: card.querySelectorAll("p")[0].textContent,
            hours: card.querySelectorAll("p")[1].textContent
        };

        // Get existing favorites
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        // Check if already saved
        const exists = favorites.some(item => item.title === resource.title);

        if (!exists) {

            favorites.push(resource);

            // Save back to localStorage
            localStorage.setItem("favorites", JSON.stringify(favorites));

            // Change button text
            this.textContent = "Added to Favorites";

        } else {

            alert("This resource is already in your favorites.");

        }

    });

});




const favoritesContainer = document.getElementById("favoritesContainer");

if (favoritesContainer) {

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.forEach(resource => {

        favoritesContainer.innerHTML += `

        <div class="resource-card">

            <h3>${resource.title}</h3>

            <p>${resource.location}</p>

            <p>${resource.hours}</p>

        </div>

        `;

    });

}


const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

favoriteButtons.forEach(button => {

    const card = button.closest(".resource-card");

    const title = card.querySelector("h3").textContent;

    const exists = favorites.some(item => item.title === title);

    if (exists) {

        button.textContent = "Added to Favorites";
        button.disabled = true;

    }

});