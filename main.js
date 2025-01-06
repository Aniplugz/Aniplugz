document.addEventListener('DOMContentLoaded', () => {
    // Check login state and update UI accordingly
    checkLoginState();
    updateTrendingAnime();
    handleLoginLogout();
    setupProfileManagement();
    initializeChatroom();

    // Event listeners for carousel navigation
    document.getElementById('leftArrow').addEventListener('click', scrollTrendingLeft);
    document.getElementById('rightArrow').addEventListener('click', scrollTrendingRight);
});

function checkLoginState() {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    document.getElementById('loginLogoutLink').textContent = loggedIn ? 'Logout' : 'Login';
    if (loggedIn) {
        const username = localStorage.getItem('username');
        document.getElementById('profileTitle').textContent = `Welcome, ${username}`;
    }
}

function updateTrendingAnime() {
    const trendingRow = document.getElementById('trendingRow');
    trendingRow.innerHTML = ''; // Clear existing content
    // Fetch and display trending anime data
    fetch('/path/to/trending/anime/data')
        .then(response => response.json())
        .then(animeList => {
            animeList.forEach((anime, index) => {
                const panel = document.createElement('div');
                panel.className = 'trending-panel';
                panel.innerHTML = `
                    <img src="${anime.image}" alt="${anime.title}">
                    <div class="vertical-title">${anime.title}</div>
                    <div class="rank">${index + 1}</div>
                `;
                trendingRow.appendChild(panel);
            });
        });
}

function handleLoginLogout() {
    document.getElementById('loginLogoutLink').addEventListener('click', () => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (loggedIn) {
            localStorage.setItem('isLoggedIn', 'false');
            alert('You have been logged out.');
        } else {
            // Simulate login process
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', 'DemoUser');
            alert('Login successful as DemoUser');
        }
        checkLoginState();
    });
}

function setupProfileManagement() {
    const avatarInput = document.getElementById('avatarInput');
    avatarInput.addEventListener('change', event => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
            document.getElementById('avatarPreview').src = reader.result;
            localStorage.setItem('userAvatar', reader.result);
        };
        reader.readAsDataURL(file);
    });

    document.getElementById('saveBioBtn').addEventListener('click', () => {
        const bio = document.getElementById('bioInput').value;
        localStorage.setItem('userBio', bio);
        alert('Bio saved successfully!');
    });
}

function initializeChatroom() {
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    sendMessageBtn.addEventListener('click', () => {
        const messageInput = document.getElementById('chatInput');
        const message = messageInput.value.trim();
        if (message) {
            const chatMessages = document.getElementById('chatMessages');
            const msgDiv = document.createElement('div');
            msgDiv.textContent = `You: ${message}`;
            chatMessages.appendChild(msgDiv);
            messageInput.value = ''; // Clear input after sending
            // Auto scroll to latest message
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });
}

function scrollTrendingLeft() {
    const trendingRow = document.getElementById('trendingRow');
    trendingRow.scrollBy({ left: -200, behavior: 'smooth' });
}

function scrollTrendingRight() {
    const trendingRow = document.getElementById('trendingRow');
    trendingRow.scrollBy({ left: 200, behavior: 'smooth' });
}
