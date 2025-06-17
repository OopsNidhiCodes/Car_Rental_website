// Car data
const cars = [
    {
        id: 1,
        name: 'Innova Crysta',
        description: 'Premium comfort for family and business travel',
        price: '₹17/km',
        image: 'assets/car1.jpg'
    },
    {
        id: 2,
        name: 'Ertiga',
        description: 'Spacious and comfortable for family trips',
        price: '₹13/km',
        image: 'assets/car2.jpg'
    },
    {
        id: 3,
        name: 'Tempo Traveller',
        description: 'Perfect for group travel and tours',
        price: '₹24/km',
        image: 'assets/car3.jpg'
    },
    {
        id: 4,
        name: 'Swift Dzire',
        description: 'Efficient and comfortable economy cabs',
        price: '₹11/km',
        image: 'assets/car4.jpg'
    },
    {
        id: 5,
        name: 'Honda Amaze',
        description: 'Stylish and reliable cabs',
        price: '₹11/km',
        image: 'assets/car5.jpg'
    },
    {
        id: 6,
        name: 'Aura',
        description: 'Modern and fuel-efficient cabs',
        price: '₹11/km',
        image: 'assets/car6.jpg'
    }
];

// DOM Elements
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const carGrid = document.getElementById('carGrid');
const contactForm = document.getElementById('contactForm');


// Toggle mobile menu
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Populate car grid
function populateCarGrid() {
    carGrid.innerHTML = cars.map(car => `
        <div class="car-card">
            <img src="${car.image}" alt="${car.name}" class="car-image">
            <div class="car-info">
                <h3>${car.name}</h3>
                <p>${car.description}</p>
                <p class="car-price">${car.price}</p>
                <a href="#booking" class="btn-primary">Book Now</a>
            </div>
        </div>
    `).join('');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateCarGrid();
    
    // Populate car select options
    const carTypeSelect = document.getElementById('carType');
    if (carTypeSelect) {
        carTypeSelect.innerHTML = '<option value="">Choose a car</option>' +
            cars.map(car => `<option value="${car.name}">${car.name} - ${car.price}</option>`).join('');
    } else {
        console.error('Car type select element not found on page load!');
    }

    // Initialize date pickers
    const pickupDateInput = document.getElementById('pickupDate');
    const returnDateInput = document.getElementById('returnDate');

    if (pickupDateInput && returnDateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const formatDate = (date) => {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        };

        pickupDateInput.min = formatDate(today);
        returnDateInput.min = formatDate(tomorrow);

        pickupDateInput.addEventListener('change', () => {
            const pickup = new Date(pickupDateInput.value);
            const nextDay = new Date(pickup);
            nextDay.setDate(nextDay.getDate() + 1);
            returnDateInput.min = formatDate(nextDay);

            if (new Date(returnDateInput.value) <= pickup) {
                returnDateInput.value = formatDate(nextDay);
            }
        });
    }
});

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scroll = window.scrollY;
        
        if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + section.getAttribute('id')) {
                    link.classList.add('active');
                }
            });
        }
    });
});
