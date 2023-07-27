const aboutBtn = document.querySelector(".about-btn"),
aboutContainer = document.querySelector(".about-container"),
container = document.querySelector(".container"),
backBtn = document.querySelector(".back-btn");

function onClick() {
    if (container.classList.contains("hidden")) {
        container.classList.remove("hidden")
        aboutContainer.classList.add("hidden")
    }
    else {
        container.classList.add("hidden")
        aboutContainer.classList.remove("hidden")
    }
}

aboutBtn.addEventListener("click", onClick);
backBtn.addEventListener("click", onClick);