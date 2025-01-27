document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll(".slideshow img");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, 3000);
});


// here we write slider container




document.addEventListener("DOMContentLoaded", function () { 
    const smallCardsData = [
        { id: 1, price: "$49.99", image: "assets/events/event3.jpg" },
        { id: 2, price: "$39.99", image: "assets/events/event2.jpg" },
        { id: 3, price: "$29.99", image: "assets/events/event3.jpg" },
        { id: 4, price: "$19.99", image: "assets/events/event2.jpg" },
        { id: 5, price: "$9.99", image: "assets/events/event3.jpg" }
    ];

    let currentCardIndex = 0;
    let intervalId;

    const bigCardImage = document.getElementById("bigCardImage");
    const bigCardPrice = document.getElementById("bigCardPrice");
    const smallCardsContainer = document.getElementById("smallCardsContainer");

    // Function to update big card
    function updateBigCard(index) {
        const card = smallCardsData[index];
        bigCardImage.src = card.image;
        bigCardPrice.textContent = card.price;
        document.querySelectorAll(".cardslider").forEach(card => card.classList.remove("clicked"));
        document.querySelectorAll(".cardslider")[index].classList.add("clicked");
    }

    // Create small cards dynamically
    smallCardsData.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.className = `cardslider ${index === currentCardIndex ? "clicked" : ""}`;
        cardElement.innerHTML = `
            <img src="${card.image}" alt="Small Card">
        `;
        cardElement.addEventListener("click", () => {
            clearInterval(intervalId);
            currentCardIndex = index;
            updateBigCard(index);
        });
        smallCardsContainer.appendChild(cardElement);
    });

    // Auto-slideshow function
    function startSlideshow() {
        intervalId = setInterval(() => {
            currentCardIndex = (currentCardIndex + 1) % smallCardsData.length;
            updateBigCard(currentCardIndex);
        }, 1500);
    }

    startSlideshow();
});



// third page 
document.addEventListener("DOMContentLoaded", () => {
    const leftCardsData = [
        { id: 1, name: "Hogwart", price: "$49.99", image: "assets/events/event3.jpg" },
        { id: 2, name: "COD", price: "$39.99", image: "assets/events/event2.jpg" },
        { id: 3, name: "Elden Ring", price: "$29.99", image: "assets/events/event3.jpg" },
        { id: 4, name: "Destiny", price: "$19.99", image: "assets/events/event2.jpg" },
        { id: 5, name: "Battlefield", price: "$9.99", image: "assets/events/event1.jpg" }
    ];

    let currentCardIndex = 0;
    let intervalId;

    const rightCardImage = document.getElementById("rightCardImage");
    const rightCardName = document.getElementById("rightCardName");
    const rightCardPrice = document.getElementById("rightCardPrice");
    const leftCardsContainer = document.getElementById("leftCardsContainer");

    function updateRightCard(index) {
        const card = leftCardsData[index];
        rightCardImage.src = card.image;
        rightCardName.textContent = card.name;
        rightCardPrice.textContent = card.price;
    }

    function startAutoSlide() {
        intervalId = setInterval(() => {
            currentCardIndex = (currentCardIndex + 1) % leftCardsData.length;
            updateRightCard(currentCardIndex);
            highlightActiveCard();
        }, 3000);
    }

    function highlightActiveCard() {
        document.querySelectorAll(".card-slider").forEach((card, index) => {
            card.classList.toggle("clicked", index === currentCardIndex);
        });
    }

    function handleCardClick(index) {
        currentCardIndex = index;
        updateRightCard(index);
        highlightActiveCard();
        clearInterval(intervalId);
    }

    function renderLeftCards() {
        leftCardsContainer.innerHTML = "";
        leftCardsData.forEach((card, index) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card-slider");
            cardElement.innerHTML = `
                <img src="${card.image}" alt="${card.name}">
            `;
            cardElement.addEventListener("click", () => handleCardClick(index));
            leftCardsContainer.appendChild(cardElement);
        });
        highlightActiveCard();
    }

    renderLeftCards();
    startAutoSlide();
});
