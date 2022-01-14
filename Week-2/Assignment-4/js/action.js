const headline = document.querySelector(".headline");
const btnExtend = document.querySelector(".btn-extend");
headline.addEventListener("click", () => {
    headline.textContent = "Have a Good Time!";
});

btnExtend.addEventListener("click", () => {
    const extendContent = document.getElementById("extension");
    extendContent.style.removeProperty("display");
});

