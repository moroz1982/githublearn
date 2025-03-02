// Генерация категорий
const categories = [
    {
        title: "Кухни",
        image: "https://source.unsplash.com/random/800x600?kitchen",
        description: "Индивидуальные кухонные гарнитуры"
    },
    // ... остальные категории
];

function createCategoryCard(category) {
    return `
        <div class="category-card">
            <div class="card-image" style="background-image: url('${category.image}')"></div>
            <div class="card-content">
                <h3>${category.title}</h3>
                <p>${category.description}</p>
            </div>
        </div>
    `;
}

document.getElementById('categoriesContainer').innerHTML = categories.map(createCategoryCard).join('');

// Анимации
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.category-card').forEach((card) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Фильтрация и сортировка
const projects = [
    {id: 1, title: "Современная кухня", category: "Кухни", price: 120000, popularity: 95, image: "image1.jpg"},
    // ... остальные проекты
];

function filterAndSort() {
    const sortBy = document.getElementById('sortSelect').value;
    const filtered = projects.sort((a, b) => b[sortBy] - a[sortBy]);
    renderProjects(filtered);
}

function renderProjects(projects) {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = projects.map(project => `
        <div class="category-card">
            <div class="card-image" style="background-image: url('${project.image}')"></div>
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>Цена: ${project.price} руб</p>
            </div>
        </div>
    `).join('');
}

// Калькулятор
function calculatePrice() {
    const width = document.getElementById('width').value / 100;
    const height = document.getElementById('height').value / 100;
    const materialPrice = [0, 1500, 2500, 4000][document.getElementById('material').value];
    const total = Math.round(width * height * materialPrice * 1.2);
    document.getElementById('result').innerHTML = `<h3>Примерная стоимость: ${total} руб</h3>`;
}

// Отзывы
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

function addReview(e) {
    e.preventDefault();
    const newReview = {
        name: document.getElementById('userName').value,
        text: document.getElementById('reviewText').value,
        date: new Date().toLocaleDateString()
    };
    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    renderReviews();
    e.target.reset();
}

function renderReviews() {
    const container = document.getElementById('reviewsContainer');
    container.innerHTML = reviews.map(review => `
        <div class="review-item">
            <h4>${review.name}</h4>
            <p>${review.text}</p>
            <small>${review.date}</small>
        </div>
    `).join('');
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    filterAndSort();
    renderReviews();
    document.getElementById('sortSelect').addEventListener('change', filterAndSort);
});