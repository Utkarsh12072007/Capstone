const testsData = {
    heart: {
        title: "Heart Health",
        price: 89,
        img: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=250&fit=crop",
        iconClass: "icon-red",
        emoji: "❤️",
        desc: "Monitor cardiovascular wellness with lipid panels and more. Essential for long-term health monitoring.",
        features: ["Lipid Panel", "Cholesterol Check", "Inflammation Markers", "Doctor Review"]
    },
    fitness: {
        title: "Fitness & Energy",
        price: 129,
        img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=250&fit=crop",
        iconClass: "icon-orange",
        emoji: "⚡",
        desc: "Track metabolism, vitamins, and performance markers to optimize your workout routine.",
        features: ["Testosterone", "Vitamin B12", "Metabolic Rate", "Cortisol"]
    },
    hormones: {
        title: "Hormones",
        price: 149,
        img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
        iconClass: "icon-blue",
        emoji: "💧",
        desc: "Understand hormonal balance and reproductive health. Gain clarity on mood and energy.",
        features: ["Thyroid Panel", "Estrogen", "Progesterone", "Fertility Insights"]
    },
    mental: {
        title: "Mental Wellness",
        price: 119,
        img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=250&fit=crop",
        iconClass: "icon-purple",
        emoji: "🧠",
        desc: "Assess stress, sleep, and cognitive health indicators to improve your daily wellbeing.",
        features: ["Stress Hormones", "Sleep Cycle", "Magnesium", "Vitamin D"]
    },
    thyroid: {
        title: "Thyroid Complete",
        price: 99,
        img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=250&fit=crop",
        iconClass: "icon-teal",
        emoji: "🦋",
        desc: "Check your thyroid function to understand weight changes, energy levels, and overall metabolism.",
        features: ["TSH", "Free T3 & T4", "TPO Antibodies", "Endocrinologist Report"]
    },
    gut: {
        title: "Gut Health",
        price: 199,
        img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop",
        iconClass: "icon-green",
        emoji: "🦠",
        desc: "Analyze your microbiome diversity and check for leaky gut indicators or inflammation.",
        features: ["Microbiome Check", "Digestion Efficiency", "Inflammation", "Diet Plan"]
    },
    vitamin: {
        title: "Essential Vitamins",
        price: 79,
        img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=250&fit=crop",
        iconClass: "icon-orange",
        emoji: "🍊",
        desc: "Ensure you aren't deficient in the essential nutrients your body needs for immunity.",
        features: ["Vitamin D", "Iron / Ferritin", "Magnesium", "Zinc"]
    },
    allergy: {
        title: "Food Sensitivity",
        price: 159,
        img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=250&fit=crop",
        iconClass: "icon-red",
        emoji: "🌾",
        desc: "Test your body's reaction to 96 common foods to find what might be causing discomfort.",
        features: ["96 Food Types", "IgG Antibodies", "Elimination Guide", "Fast Results"]
    }
};

let favorites = [];
let cart = [];

const slider = document.getElementById('cardSlider');

function renderCards() {
    let html = '';
    const createCardHTML = (key, t) => `
        <div class="card" id="card-${key}">
            <button class="favorite-btn" onclick="toggleFav(this, '${key}')">♥</button>
            <div class="card-image">
                <img src="${t.img}" alt="${t.title}">
            </div>
            <div class="content">
                <div class="icon ${t.iconClass}">${t.emoji}</div>
                <h3>${t.title}</h3>
                <p>${t.desc.substring(0, 50)}...</p>
                <button class="btn" onclick="openDetails('${key}')" style="width:100%; text-align:center;">View Details</button>
            </div>
        </div>
    `;
    
    for(let key in testsData) html += createCardHTML(key, testsData[key]);
    for(let key in testsData) html += createCardHTML(key, testsData[key]);
    
    slider.innerHTML = html;
}
renderCards();

let scrollInterval;
function startInfiniteScroll() {
    scrollInterval = setInterval(() => {
        if(slider.scrollLeft >= slider.scrollWidth / 2) {
            slider.scrollLeft = 0;
        } else {
            slider.scrollLeft += 1;
        }
    }, 20);
}

function stopInfiniteScroll() {
    clearInterval(scrollInterval);
}

startInfiniteScroll();

slider.addEventListener('mouseenter', stopInfiniteScroll);
slider.addEventListener('mouseleave', startInfiniteScroll);
slider.addEventListener('touchstart', stopInfiniteScroll);
slider.addEventListener('touchend', startInfiniteScroll);

function toggleFav(btn, key) {
    if(favorites.includes(key)) {
        favorites = favorites.filter(k => k !== key);
        btn.classList.remove('active');
        document.querySelectorAll(`#card-${key} .favorite-btn`).forEach(b => b.classList.remove('active'));
    } else {
        favorites.push(key);
        document.querySelectorAll(`#card-${key} .favorite-btn`).forEach(b => b.classList.add('active'));
    }
    updateBadges();
}

function addToCart(key) {
    cart.push(key);
    updateBadges();
    closeDetailView();
    alert('Added to Cart!');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCartList();
    updateBadges();
}

function removeFromFav(key) {
    favorites = favorites.filter(k => k !== key);
    updateBadges();
    renderFavList();
    document.querySelectorAll(`#card-${key} .favorite-btn`).forEach(b => b.classList.remove('active'));
}

function updateBadges() {
    const favCount = document.getElementById('favCount');
    const cartCount = document.getElementById('cartCount');

    favCount.innerText = favorites.length;
    if (favorites.length === 0) {
        favCount.classList.add('hidden');
    } else {
        favCount.classList.remove('hidden');
    }

    cartCount.innerText = cart.length;
    if (cart.length === 0) {
        cartCount.classList.add('hidden');
    } else {
        cartCount.classList.remove('hidden');
    }
}

function renderFavList() {
    const list = document.getElementById('favoritesList');
    const emptyMsg = document.getElementById('emptyFavMsg');
    
    list.innerHTML = '';
    
    if(favorites.length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
        favorites.forEach(key => {
            const item = testsData[key];
            list.innerHTML += `
                <div class="list-item">
                    <div class="list-emoji">${item.emoji}</div>
                    <div class="list-details">
                        <div class="list-title">${item.title}</div>
                        <div class="list-price">$${item.price}</div>
                    </div>
                    <button class="remove-btn" onclick="removeFromFav('${key}')">Remove</button>
                </div>
            `;
        });
    }
}

function renderCartList() {
    const list = document.getElementById('cartList');
    const emptyMsg = document.getElementById('emptyCartMsg');
    const totalArea = document.getElementById('cartTotalArea');
    const totalEl = document.getElementById('cartTotal');
    
    list.innerHTML = '';
    let total = 0;

    if(cart.length === 0) {
        emptyMsg.style.display = 'block';
        totalArea.style.display = 'none';
    } else {
        emptyMsg.style.display = 'none';
        totalArea.style.display = 'block';
        
        cart.forEach((key, index) => {
            const item = testsData[key];
            total += item.price;
            list.innerHTML += `
                <div class="list-item">
                    <div class="list-emoji">${item.emoji}</div>
                    <div class="list-details">
                        <div class="list-title">${item.title}</div>
                        <div class="list-price">$${item.price}</div>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });
        totalEl.innerText = '$' + total;
    }
}

const favModal = document.getElementById('favoritesModal');
const cartModal = document.getElementById('cartModal');

function openFavoritesModal() {
    renderFavList();
    favModal.style.display = 'flex';
}
function closeFavoritesModal() { favModal.style.display = 'none'; }

function openCartModal() {
    renderCartList();
    cartModal.style.display = 'flex';
}
function closeCartModal() { cartModal.style.display = 'none'; }


const detailView = document.getElementById('detail-view');
let currentDetailKey = null;

function openDetails(key) {
    currentDetailKey = key;
    const t = testsData[key];
    document.getElementById('detailTitle').innerText = t.title;
    document.getElementById('detailPrice').innerText = '$' + t.price;
    document.getElementById('detailDesc').innerText = t.desc;
    document.getElementById('detailEmoji').innerText = t.emoji;
    
    const list = document.getElementById('detailFeatures');
    list.innerHTML = '';
    t.features.forEach(f => list.innerHTML += `<li>✓ ${f}</li>`);
    
    const btn = document.getElementById('addToCartBtn');
    btn.onclick = () => addToCart(key);
    
    detailView.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeDetailView() {
    detailView.style.display = 'none';
    document.body.style.overflow = 'auto';
}


const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('navLoginBtn');
const closeAuth = document.getElementById('closeAuth');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginBtn.addEventListener('click', (e) => { e.preventDefault(); authModal.style.display = 'flex'; });
closeAuth.addEventListener('click', () => authModal.style.display = 'none');

document.getElementById('showSignup').addEventListener('click', () => {
    loginForm.classList.add('hidden-form');
    signupForm.classList.remove('hidden-form');
});

document.getElementById('showLogin').addEventListener('click', () => {
    signupForm.classList.add('hidden-form');
    loginForm.classList.remove('hidden-form');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('loginUser').value;
    alert('Welcome back, ' + user + '!');
    authModal.style.display = 'none';
    loginBtn.innerText = 'Hi, ' + user;
});

window.onclick = (e) => {
    if(e.target === authModal) authModal.style.display = 'none';
    if(e.target === favModal) favModal.style.display = 'none';
    if(e.target === cartModal) cartModal.style.display = 'none';
    if(e.target === detailView) closeDetailView();
};