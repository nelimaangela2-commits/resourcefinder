const search = document.getElementById("search");
const dropdown = document.querySelector(".dropdown");

search.addEventListener("focus", () => {
    dropdown.computedStyleMap.display = "block";
});

document.addEventListener("click", (e) => {
    if(!e.target.closest(".search-container")){
        dropdown.computedStyleMap.display = "none";
    }
});