// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling (if form exists)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            vehicle: document.getElementById('vehicle').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send this data to a server
        // For now, we'll just show an alert
        alert('Thank you for your inquiry! We will contact you soon.\n\n' +
            'Name: ' + formData.name + '\n' +
            'Phone: ' + formData.phone + '\n' +
            'Email: ' + formData.email + '\n' +
            'Vehicle: ' + (formData.vehicle || 'Not specified') + '\n' +
            'Message: ' + (formData.message || 'No message'));

        // Reset form
        contactForm.reset();
    });
}

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-category, .service-card, .brand-card, .feature-item');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize Google Maps
    initializeGoogleMap();
});

// Google Maps Configuration
// ============================================
// INSTRUCTIONS TO GET YOUR GOOGLE MAPS EMBED CODE AND LOCATION DETAILS:
//
// METHOD 1 - Get Embed Code from Google Maps:
// 1. Go to Google Maps (maps.google.com)
// 2. Search for your business address
// 3. Click on "Share" button
// 4. Select "Embed a map" tab
// 5. Copy the iframe src URL - it will look like:
//    https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502...
// 6. Paste the full URL into the embedUrl variable below
//
// METHOD 2 - Get Address and Coordinates:
// 1. Right-click on your location in Google Maps
// 2. Click on the coordinates (latitude, longitude) that appear
// 3. Copy the coordinates - they will look like: 28.7041, 77.1025
// 4. The address will be displayed in the info box
// 5. Update the businessLocation object below with your details
//
// METHOD 3 - Extract from Google Maps URL:
// If you have a Google Maps URL, you can extract location info
// Example: https://www.google.com/maps/place/Your+Business+Name/@28.7041,77.1025
// The numbers after @ are your coordinates (latitude,longitude)
// ============================================

const businessLocation = {
    // Business address
    // Location: BALAJI TRADING COMPANY, Khaira, Mahendragarh, Haryana
    address: "Khaira, Mahendragarh, Haryana, India",

    // Coordinates (latitude, longitude)
    // Precise coordinates from Google Maps: https://maps.app.goo.gl/oMq6Hw6jwTWTcB8x9
    coordinates: {
        lat: 28.2705624,  // Latitude
        lng: 76.1227548   // Longitude
    },

    // Direct Google Maps embed URL (optional - use this if you copied the embed code)
    // Leave empty to auto-generate from address/coordinates
    embedUrl: "" // Will auto-generate from address/coordinates above
};

// Function to initialize Google Maps
function initializeGoogleMap() {
    const mapIframe = document.getElementById('googleMap');
    const locationAddress = document.getElementById('locationAddress');
    const locationCoordinates = document.getElementById('locationCoordinates');
    const directionsLink = document.getElementById('directionsLink');
    const storeAddress = document.getElementById('storeAddress');
    const storeCity = document.getElementById('storeCity');
    const storeCoordinates = document.getElementById('storeCoordinates');

    // Use custom embed URL if provided, otherwise generate from address/coordinates
    let embedUrl;

    if (businessLocation.embedUrl && businessLocation.embedUrl.trim() !== "") {
        // Use the provided embed URL from Google Maps
        embedUrl = businessLocation.embedUrl;
    } else {
        // Generate embed URL from address or coordinates
        // Using coordinates for more precise location
        // Using the embed API format that works reliably
        embedUrl = `https://maps.google.com/maps?q=${businessLocation.coordinates.lat},${businessLocation.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

        // Alternative: Use address if coordinates are not available
        // const addressQuery = encodeURIComponent(businessLocation.address);
        // embedUrl = `https://www.google.com/maps?q=${addressQuery}&output=embed`;
    }

    // Set the iframe source
    if (mapIframe) {
        mapIframe.src = embedUrl;
    }


    // Update location information
    if (locationAddress) {
        // Show coordinates in Location Details instead of address
        locationAddress.textContent = `${businessLocation.coordinates.lat}, ${businessLocation.coordinates.lng}`;
    }

    if (locationCoordinates) {
        locationCoordinates.textContent = `${businessLocation.coordinates.lat}, ${businessLocation.coordinates.lng}`;
    }

    // Update contact section address
    if (storeAddress) {
        const addressParts = businessLocation.address.split(',');
        storeAddress.textContent = addressParts[0] || businessLocation.address;
        if (addressParts.length > 1 && storeCity) {
            storeCity.textContent = addressParts.slice(1).join(', ').trim();
        }
    }

    // Update coordinates in contact section
    if (storeCoordinates) {
        storeCoordinates.textContent = `Coordinates: ${businessLocation.coordinates.lat}, ${businessLocation.coordinates.lng}`;
    }

    // Set up directions link
    if (directionsLink) {
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${businessLocation.coordinates.lat},${businessLocation.coordinates.lng}`;
        directionsLink.href = directionsUrl;
    }

    // Function to extract location details from Google Maps URL
    extractLocationFromMap();
}

// Function to extract location details from map iframe
function extractLocationFromMap() {
    const mapIframe = document.getElementById('googleMap');

    if (mapIframe) {
        // Listen for map load
        mapIframe.addEventListener('load', () => {
            console.log('Google Maps loaded successfully');

            // Try to get location info from the iframe (if accessible)
            try {
                // Note: Due to CORS restrictions, we can't directly access iframe content
                // The location details should be set in businessLocation object above
                updateLocationDetails();
            } catch (error) {
                console.log('Map loaded. Location details set from configuration.');
            }
        });
    }
}

// Function to update all location details throughout the page
function updateLocationDetails() {
    // This function can be called when location details are retrieved
    // For now, it uses the businessLocation object configured above

    const address = businessLocation.address;
    const coordinates = businessLocation.coordinates;

    // Update all address references
    const addressElements = document.querySelectorAll('.address-line, #locationAddress');
    addressElements.forEach(el => {
        if (el.id === 'locationAddress') {
            el.textContent = address;
        }
    });

    // Update all coordinate references
    const coordinateElements = document.querySelectorAll('#locationCoordinates, #storeCoordinates');
    coordinateElements.forEach(el => {
        if (el.id === 'locationCoordinates' || el.id === 'storeCoordinates') {
            el.textContent = `${coordinates.lat}, ${coordinates.lng}`;
        }
    });
}

// Function to get address from coordinates (requires Google Maps Geocoding API)
async function getAddressFromCoordinates(lat, lng) {
    // Note: This requires a Google Maps Geocoding API key
    // Uncomment and configure if you have an API key

    /*
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            return data.results[0].formatted_address;
        }
    } catch (error) {
        console.error('Error fetching address:', error);
    }
    */

    return null;
}

// Function to get coordinates from address (requires Google Maps Geocoding API)
async function getCoordinatesFromAddress(address) {
    // Note: This requires a Google Maps Geocoding API key
    // Uncomment and configure if you have an API key

    /*
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
    }
    */

    return null;
}

// Function to extract location details from Google Maps URL
// This function can parse a Google Maps URL and extract address/coordinates
function extractLocationFromGoogleMapsUrl(mapUrl) {
    try {
        // Extract coordinates from URL format: .../@LAT,LNG
        const coordMatch = mapUrl.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
        if (coordMatch) {
            return {
                lat: parseFloat(coordMatch[1]),
                lng: parseFloat(coordMatch[2])
            };
        }

        // Extract place name or address from URL
        const placeMatch = mapUrl.match(/place\/([^/@]+)/);
        if (placeMatch) {
            const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
            return { address: placeName };
        }
    } catch (error) {
        console.error('Error extracting location from URL:', error);
    }

    return null;
}

// Mouse Parallax Effect for Background Shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.bg-shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;

        // Combine the mouse offset with the current animation state
        // We use a slight transform to not interfere too much with the CSS animation
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Example usage: Call this function with a Google Maps URL to extract location info
// const locationInfo = extractLocationFromGoogleMapsUrl('https://www.google.com/maps/place/Your+Place/@28.7041,77.1025');
// console.log('Extracted location:', locationInfo);
