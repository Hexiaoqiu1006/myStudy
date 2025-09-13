// 首页交互效果脚本

// 动态加载首页增强脚本
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    const script = document.createElement('script');
    script.src = '/js/home-enhancement.js';
    script.async = true;
    document.head.appendChild(script);
    console.log('正在加载首页增强功能...');
}

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 技能标签悬停效果
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 2. 统计数字动画效果
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent.replace(/[^\d]/g, '');
                animateNumber(target, 0, parseInt(finalNumber), 2000);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(num => {
        observer.observe(num);
    });

    // 数字动画函数
    function animateNumber(element, start, end, duration) {
        const range = end - start;
        const startTime = Date.now();
        const suffix = element.textContent.replace(/[\d]/g, '');

        function updateNumber() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + range * easeOutQuart(progress));
            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }

        updateNumber();
    }

    // 缓动函数
    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }

    // 3. 文章卡片悬停效果
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
    });

    // 4. 邮箱订阅功能
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const emailInput = document.querySelector('.email-input');

    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // 模拟订阅成功
                showNotification('订阅成功！感谢您的关注 🎉', 'success');
                emailInput.value = '';
            } else {
                showNotification('请输入有效的邮箱地址 📧', 'error');
            }
        });

        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }

    // 邮箱验证函数
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // 通知函数
    function showNotification(message, type) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            font-weight: 500;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // 显示动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // 5. 平滑滚动效果
    const heroButtons = document.querySelectorAll('.hero-btn[href^="#"], .hero-btn[href^="/"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是锚点链接，使用平滑滚动
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 6. 滚动时的视差效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            const rate = scrolled * -0.3;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });

    // 7. 技能标签随机颜色效果
    const colors = [
        'linear-gradient(45deg, #667eea, #764ba2)',
        'linear-gradient(45deg, #f093fb, #f5576c)',
        'linear-gradient(45deg, #4facfe, #00f2fe)',
        'linear-gradient(45deg, #43e97b, #38f9d7)',
        'linear-gradient(45deg, #fa709a, #fee140)',
        'linear-gradient(45deg, #a8edea, #fed6e3)',
        'linear-gradient(45deg, #ff9a9e, #fecfef)',
        'linear-gradient(45deg, #ffecd2, #fcb69f)'
    ];

    skillTags.forEach((tag, index) => {
        const colorIndex = index % colors.length;
        tag.style.background = colors[colorIndex];
    });

    // 8. 联系按钮点击效果
    const contactBtns = document.querySelectorAll('.contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // 添加点击波纹效果
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            `;

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 添加动画样式到头部
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .post-card {
            transition: all 0.3s ease;
        }
        
        .skill-tag {
            transition: all 0.3s ease;
        }
        
        .hero-content {
            transition: transform 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);

    console.log('首页交互效果已加载完成 ✨');
});