

document.addEventListener("DOMContentLoaded", () => {

    //  nav link to scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#!') {
            link.addEventListener('click', (e) => e.preventDefault());
        }
    });

    const activateNavLinkOnScroll = () => {
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // offset a bit so it feels right, not triggering too early
            if (pageYOffset >= sectionTop - 100) { 
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    };
    
    window.addEventListener("scroll", activateNavLinkOnScroll);


    const form = document.querySelector(".form-section-box form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for your message! I will get back to you soon.");
            form.reset();
        });
    }


    // carousel stuff
    const grid = document.querySelector(".recommendation-grid");
    const cards = document.querySelectorAll(".recommendation-card");
    const dotsContainer = document.querySelector(".carousel-dots");

    // make sure the carousel is on the page before runnin this
    if (grid && cards.length > 0 && dotsContainer) {
        let currentIndex = 0;
        const totalCards = cards.length;
        let cardsToShow = 3;

        const updateCardsToShow = () => {
            if (window.innerWidth <= 768) cardsToShow = 1;
            else if (window.innerWidth <= 1200) cardsToShow = 2;
            else cardsToShow = 3;
        };

        if (dotsContainer.children.length === 0) {
            for (let i = 0; i < totalCards; i++) {
                const dot = document.createElement("span");
                dot.classList.add("dot");
                dot.addEventListener("click", () => {
                    let targetIndex = i;
                    if (targetIndex > totalCards - cardsToShow) {
                        targetIndex = totalCards - cardsToShow;
                    }
                    goToSlide(targetIndex);
                });
                dotsContainer.appendChild(dot);
            }
        }

        const dots = document.querySelectorAll(".carousel-dots .dot");
        const updateDots = () => {
             dots.forEach((dot, index) => dot.classList.toggle("active", index === currentIndex));
        };

        const goToSlide = (index) => {
            if (index < 0) index = 0;
            else if (index > totalCards - cardsToShow) index = totalCards - cardsToShow;
            
            currentIndex = index;
            const cardWidth = cards[0].getBoundingClientRect().width;
            const gridGap = parseInt(window.getComputedStyle(grid).gap) || 20;

            // the math to figure out how much to move teh whole thing
            const offset = (cardWidth + gridGap) * currentIndex;
            
            grid.style.transform = `translateX(-${offset}px)`;
            updateDots();
        };
        
        updateCardsToShow();
        goToSlide(0);

        // gotta recalculate everything on resize, otherwise it breaks
        window.addEventListener("resize", () => {
            updateCardsToShow();
            goToSlide(currentIndex);
});
    }
});