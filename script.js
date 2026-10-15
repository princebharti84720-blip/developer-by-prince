// 1. Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    if(body.classList.contains('light-theme')) {
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        icon.classList.replace('fa-moon', 'fa-sun');
    }
});

// 2. NEW: Scroll Animation Trigger Logic (Intersection Observer)
const scrollElements = document.querySelectorAll('.scroll-animate, .service-card');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
};

const displayScrollElement = (element) => {
    element.classList.add('show');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        // Adds scroll-animate utility group dynamically
        if (!el.classList.contains('scroll-animate')) {
            el.classList.add('scroll-animate');
        }
        if (elementInView(el, 1.15)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => { 
    handleScrollAnimation();
});

// Initial trigger on load
handleScrollAnimation();


// 3. Interactive Project Estimator Logic
const checkboxes = document.querySelectorAll('.calc-check');
const totalPriceDisplay = document.getElementById('total-price');
const orderBtn = document.getElementById('order-btn');

function calculateTotal() {
    let total = 0;
    checkboxes.forEach(checkbox => {
        if(checkbox.checked) {
            total += parseInt(checkbox.value);
        }
    });
    totalPriceDisplay.innerText = `₹${total.toLocaleString('en-IN')}`;
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', calculateTotal);
});

// 4. WhatsApp Redirect Integration
orderBtn.addEventListener('click', () => {
    let selectedServices = [];
    checkboxes.forEach(checkbox => {
        if(checkbox.checked) {
            let labelText = checkbox.nextElementSibling.innerText.split('—')[0].trim();
            selectedServices.push(labelText);
        }
    });

    if(selectedServices.length === 0) {
        alert("Please select at least one service to discuss!");
        return;
    }

    let message = `Hello Developer By Prince, I want to discuss a project.\n\n*Selected Services*:\n- ${selectedServices.join('\n- ')}\n\n*Estimated Total*: ${totalPriceDisplay.innerText}`;
    let whatsappUrl = `https://wa.me{encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
});
