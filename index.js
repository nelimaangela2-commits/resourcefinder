const search = document.getElementById("search");
const dropdown = document.getElementById("dropdown");
const items = document.querySelectorAll(".item");

//Show dropdown when input is focused
if (search && dropdown) {
    search.addEventListener("focus", () => {

       dropdown.style.display = "block";
    });
}

//Hide dropdown when clicking outside 
document.addEventListener("click", (event) => {
    if (dropdown && !event.target.closest(".search-container")) {
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

if (modal && closeBtn) {
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

}


// Add to Favorites
const favoriteButtons = document.querySelectorAll(".favoritesBtn");
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Mark buttons as already-favorited on page load
favoriteButtons.forEach(button => {
    const card = button.closest(".resource-card");
    const id = card.dataset.id;
    const exists = favorites.some(item => item.id === id);

    if (exists) {
        button.textContent = "Added to Favorites";
        button.disabled = true;
    }
});

// Handle new favorite clicks
favoriteButtons.forEach(button => {
    button.addEventListener("click", function () {
        const card = this.closest(".resource-card");
        const detailsBtn = card.querySelector(".detailsBtn");
        const resource = {
            id: card.dataset.id,
            title: card.querySelector("h3").textContent,
            location: card.querySelectorAll("p")[0].textContent,
            hours: card.querySelectorAll("p")[1].textContent,
            description: detailsBtn.dataset.description,
            contact: detailsBtn.dataset.contact,
        };

        const exists = favorites.some(item => item.id === resource.id);

        if (!exists) {
            favorites.push(resource);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            this.textContent = "Added to Favorites";
            this.disabled = true;
        } else {
            alert("This resource is already in your favorites.");
        }
    });
});

// Render favorites on the favorites page
const favoritesContainer = document.getElementById("favoritesContainer");

if (favoritesContainer) {
    renderFavorites();
}

function renderFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>You haven't added any favorites yet.</p>";
        return;
    }

    favoritesContainer.innerHTML = favorites.map(resource => `
        <div class="resource-card">
            <h3>${resource.title}</h3>
            <p>${resource.location}</p>
            <p>${resource.hours}</p>
            <button class="detailsBtn"
            data-description="${resource.description || ''}"
            data-contact="${resource.contact || ''}">View Details</button>
            <button class="removeBtn" data-id="${resource.id}">Remove from Favorites</button>
        </div>
    `).join("");

    document.querySelectorAll("#favoritesContainer .detailsBtn").forEach(button => {
        button.addEventListener("click", function () {
            document.getElementById("modalDescription").textContent = this.dataset.description;
            document.getElementById("modalContact").textContent = this.dataset.contact;
            if (modal) modal.style.display = "flex";
        });
    });

    // Wire up the remove buttons after they're added to the page
    document.querySelectorAll(".removeBtn").forEach(button => {
        button.addEventListener("click", function () {
            removeFavorite(this.dataset.id);
        });
    });
}

function removeFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(item => item.id !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites(); // re-render so the removed card disappears immediately
}

const form = document.getElementById("help-form"); // match your actual form's id

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // stops the page reload
        
        // your logic here — validate, save, whatever the form does
        
        // show a success message
        const successMsg = document.getElementById("successMessage");
        if (successMsg) {
            successMsg.textContent = "Submitted successfully!";
            successMsg.style.display = "block";
        }
    });
}