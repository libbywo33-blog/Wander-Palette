/**
 * Travel Blog - Main JavaScript
 * Features: Dark Mode, Search, Masonry Layout, Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initSearch();
    initMasonryLayout();
    initContactForm();
    initScrollAnimations();
});

/**
 * Initialize Dark Mode Toggle
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');
    
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (icon) {
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }
}

/**
 * Initialize Search Functionality
 */
function initSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchToggle || !searchModal) return;

    // Toggle search modal
    searchToggle.addEventListener('click', () => {
        searchModal.classList.toggle('active');
        if (searchModal.classList.contains('active') && searchInput) {
            searchInput.focus();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            searchModal.classList.remove('active');
        }
    });

    // Close modal when clicking outside
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            if (query.length < 2) {
                if (searchResults) searchResults.innerHTML = '';
                return;
            }

            // Sample search data
            const articles = [
                { title: '在京都的古寺中寻找宁静', tag: '日本 · 京都' },
                { title: '阿尔卑斯山脉的徒步之旅', tag: '瑞士 · 阿尔卑斯' },
                { title: '浪漫之都的街头漫步', tag: '法国 · 巴黎' },
                { title: '水城威尼斯的梦幻之旅', tag: '意大利 · 威尼斯' },
                { title: '东京霓虹灯下的故事', tag: '日本 · 东京' },
                { title: '冰岛的极光与冰川', tag: '冰岛 · 雷克雅未克' }
            ];

            const destinations = [
                '日本', '瑞士', '法国', '意大利', '冰岛', '希腊', '新西兰', '泰国', '西班牙'
            ];

            // Filter results
            const matchedArticles = articles.filter(a => 
                a.title.toLowerCase().includes(query) || a.tag.toLowerCase().includes(query)
            );
            const matchedDestinations = destinations.filter(d => 
                d.toLowerCase().includes(query)
            );

            // Display results
            let html = '';
            
            if (matchedArticles.length > 0) {
                html += '<div style="margin-bottom: 1rem;"><strong style="color: var(--text-secondary); font-size: 0.85rem;">文章</strong></div>';
                matchedArticles.forEach(article => {
                    html += `
                        <div class="search-result-item">
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">${article.title}</div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary);">${article.tag}</div>
                        </div>
                    `;
                });
            }

            if (matchedDestinations.length > 0) {
                html += '<div style="margin: 1rem 0 0.5rem 0; border-top: 1px solid var(--border-color); padding-top: 1rem;"><strong style="color: var(--text-secondary); font-size: 0.85rem;">目的地</strong></div>';
                matchedDestinations.forEach(dest => {
                    html += `
                        <div class="search-result-item">
                            <div>${dest}</div>
                        </div>
                    `;
                });
            }

            if (html === '') {
                html = '<div style="padding: 1rem; text-align: center; color: var(--text-secondary);">未找到相关结果</div>';
            }

            if (searchResults) {
                searchResults.innerHTML = html;
            }
        });
    }
}

/**
 * Initialize Masonry Layout
 */
function initMasonryLayout() {
    const masonryGallery = document.getElementById('masonry-gallery');
    if (!masonryGallery) return;

    const resizeMasonryItems = () => {
        const items = masonryGallery.querySelectorAll('.masonry-item');
        
        items.forEach(item => {
            const img = item.querySelector('img');
            if (img && img.complete) {
                const rowSpan = Math.ceil(img.naturalHeight / 10);
                item.style.gridRowEnd = `span ${rowSpan}`;
            }
        });
    };

    // Resize on load
    window.addEventListener('load', resizeMasonryItems);
    
    // Resize on window resize
    window.addEventListener('resize', resizeMasonryItems);
    
    // Resize when images load
    const images = masonryGallery.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            resizeMasonryItems();
        } else {
            img.addEventListener('load', resizeMasonryItems);
        }
    });

    // Initial call
    setTimeout(resizeMasonryItems, 100);
}

/**
 * Initialize Contact Form
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const subject = document.getElementById('subject')?.value;
        const message = document.getElementById('message')?.value;

        // Validate form
        if (!name || !email || !subject || !message) {
            alert('请填写所有必填字段');
            return;
        }

        // Show success message
        alert(`感谢您的消息，${name}！\n\n我们已收到您的邮件，将尽快回复。\n\n（这是一个演示表单）`);
        
        // Reset form
        contactForm.reset();
    });
}

/**
 * Initialize Scroll Animations
 */
function initScrollAnimations() {
    // Add smooth scroll behavior for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Add fade-in animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.card, .destination-card, .masonry-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Utility: Close search modal
 */
function closeSearch() {
    const searchModal = document.getElementById('search-modal');
    if (searchModal) {
        searchModal.classList.remove('active');
    }
}

// Export for global use
window.closeSearch = closeSearch;


/**
 * Initialize Comments System
 */
function initComments() {
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    const commentCount = document.getElementById('comment-count');

    if (!commentForm || !commentsList) return;

    // Load comments from localStorage
    loadComments();

    // Handle form submission
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('comment-name').value.trim();
        const email = document.getElementById('comment-email').value.trim();
        const content = document.getElementById('comment-content').value.trim();

        if (!name || !email || !content) {
            alert('请填写所有必填字段');
            return;
        }

        // Validate email
        if (!isValidEmail(email)) {
            alert('请输入有效的邮箱地址');
            return;
        }

        // Create comment object
        const comment = {
            id: Date.now(),
            name: escapeHtml(name),
            email: email,
            content: escapeHtml(content),
            timestamp: new Date().toLocaleString('zh-CN'),
            replies: []
        };

        // Add comment to storage
        addComment(comment);

        // Reset form
        commentForm.reset();

        // Reload comments display
        loadComments();
    });

    function loadComments() {
        const comments = getComments();
        
        if (comments.length === 0) {
            commentsList.innerHTML = `
                <div class="comments-empty">
                    <div class="comments-empty-icon">💬</div>
                    <p>暂无评论，成为第一个评论者吧！</p>
                </div>
            `;
            if (commentCount) commentCount.textContent = '0';
            return;
        }

        // Update comment count
        if (commentCount) commentCount.textContent = comments.length;

        // Build comments HTML
        let html = '';
        comments.forEach(comment => {
            html += buildCommentHTML(comment);
        });

        commentsList.innerHTML = html;

        // Attach event listeners to delete buttons
        document.querySelectorAll('.comment-delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const commentId = parseInt(btn.dataset.commentId);
                if (confirm('确定要删除这条评论吗？')) {
                    deleteComment(commentId);
                    loadComments();
                }
            });
        });
    }

    function buildCommentHTML(comment) {
        const initials = comment.name.charAt(0).toUpperCase();
        return `
            <div class="comment-item">
                <div class="comment-header">
                    <div class="comment-author-info">
                        <div class="comment-avatar">${initials}</div>
                        <div>
                            <div class="comment-author-name">${comment.name}</div>
                            <div class="comment-author-email">${maskEmail(comment.email)}</div>
                        </div>
                    </div>
                    <div class="comment-time">${comment.timestamp}</div>
                </div>
                <div class="comment-content">${comment.content}</div>
                <div class="comment-actions">
                    <button class="comment-delete-btn" data-comment-id="${comment.id}">
                        <i class="fas fa-trash-alt"></i> 删除
                    </button>
                </div>
            </div>
        `;
    }

    function addComment(comment) {
        const comments = getComments();
        comments.unshift(comment);
        localStorage.setItem('blog_comments', JSON.stringify(comments));
    }

    function deleteComment(id) {
        let comments = getComments();
        comments = comments.filter(c => c.id !== id);
        localStorage.setItem('blog_comments', JSON.stringify(comments));
    }

    function getComments() {
        const stored = localStorage.getItem('blog_comments');
        return stored ? JSON.parse(stored) : [];
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function maskEmail(email) {
        const [localPart, domain] = email.split('@');
        const masked = localPart.charAt(0) + '*'.repeat(localPart.length - 2) + localPart.charAt(localPart.length - 1);
        return masked + '@' + domain;
    }

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Initialize comments when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initComments();
});
