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


// Select all the numbers
const counters = document.querySelectorAll(".counter");

// Create an observer that watches when the section appears
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        // Only start the animation if the counters are visible
        if (entry.isIntersecting) {

            counters.forEach(counter => {

                // Get the final number from the data-target attribute
                const target = Number(counter.dataset.target);

                // Current number starts at zero
                let current = 0;

                // Increase the number gradually
                const increment = target / 100;

                const updateCounter = () => {

                    if (current < target) {

                        current += increment;

                        const symbol = counter.dataset.symbol || "";
                        counter.textContent = Math.ceil(current) + symbol;

                        requestAnimationFrame(updateCounter);

                    } else {

                        counter.textContent = target + symbol;
                    }

                };

                updateCounter();

            });

            // Stop observing after the animation has run once
            observer.disconnect();

        }

    });

});

// Watch the Impact section
const impact = document.getElementById("impact");

if (impact) {
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