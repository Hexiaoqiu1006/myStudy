// 首页增强脚本 - 动态添加内容和交互效果

document.addEventListener('DOMContentLoaded', function() {
    
    // 检查是否是首页
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        
        // 1. 添加技能标签横幅
        addSkillsBanner();
        
        // 2. 添加统计信息卡片
        addStatsCards();
        
        // 3. 添加欢迎信息增强
        enhanceWelcomeBanner();
        
        // 4. 添加交互效果
        addInteractiveEffects();
        
        // 5. 添加平滑滚动
        addSmoothScrolling();
        
        console.log('首页增强功能已加载完成 ✨');
    }
    
    function addSkillsBanner() {
        const skills = [
            'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Next.js', 
            'Node.js', 'Tailwind CSS', 'Webpack', 'Vite', 'Git', 
            'HTML5', 'CSS3', 'SCSS', 'MongoDB', 'Express'
        ];
        
        const skillsBanner = document.createElement('div');
        skillsBanner.className = 'skills-banner';
        skillsBanner.innerHTML = `
            <h3>🛠️ 我的技术栈</h3>
            <div class="skills-container">
                ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        
        // 在第一篇文章前插入
        const firstArticle = document.querySelector('.article');
        if (firstArticle) {
            firstArticle.parentNode.insertBefore(skillsBanner, firstArticle);
        }
    }
    
    function addStatsCards() {
        const statsData = [
            { number: '3', label: '技术文章', icon: '📝' },
            { number: '2', label: '分类', icon: '📂' },
            { number: '7', label: '标签', icon: '🏷️' },
            { number: '100%', label: '原创', icon: '✨' }
        ];
        
        const statsContainer = document.createElement('div');
        statsContainer.className = 'stats-container';
        statsContainer.innerHTML = `
            <h3 style="text-align: center; color: #2c3e50; margin-bottom: 25px; font-size: 1.5em; font-weight: 700;">📊 博客统计</h3>
            <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                ${statsData.map(stat => `
                    <div class="stat-card" style="
                        background: white;
                        padding: 25px;
                        border-radius: 12px;
                        text-align: center;
                        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
                        transition: all 0.3s ease;
                        border-top: 4px solid;
                        border-image: linear-gradient(45deg, #667eea, #764ba2) 1;
                    ">
                        <div style="font-size: 2.5em; margin-bottom: 10px;">${stat.icon}</div>
                        <div class="stat-number" style="
                            font-size: 2.2em;
                            font-weight: 700;
                            background: linear-gradient(45deg, #667eea, #764ba2);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            background-clip: text;
                            margin-bottom: 5px;
                        ">${stat.number}</div>
                        <div style="color: #7f8c8d; font-size: 0.9em; font-weight: 500;">${stat.label}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // 在技能横幅后插入
        const skillsBanner = document.querySelector('.skills-banner');
        if (skillsBanner) {
            skillsBanner.parentNode.insertBefore(statsContainer, skillsBanner.nextSibling);
        }
    }
    
    function enhanceWelcomeBanner() {
        // 添加动态背景效果
        const style = document.createElement('style');
        style.textContent = `
            @keyframes backgroundShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            #main::before {
                background: linear-gradient(45deg, #667eea, #764ba2, #667eea, #764ba2);
                background-size: 400% 400%;
                animation: backgroundShift 8s ease infinite;
            }
            
            .stat-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
            }
            
            .skills-container {
                margin-top: 20px;
            }
            
            .stats-container {
                background: rgba(255, 255, 255, 0.95);
                padding: 30px;
                margin: 30px 0;
                border-radius: 15px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            }
        `;
        document.head.appendChild(style);
    }
    
    function addInteractiveEffects() {
        // 技能标签悬停效果
        document.addEventListener('mouseenter', function(e) {
            if (e.target.classList.contains('skill-tag')) {
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
            }
        }, true);
        
        document.addEventListener('mouseleave', function(e) {
            if (e.target.classList.contains('skill-tag')) {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = 'none';
            }
        }, true);
        
        // 统计数字动画
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.classList.contains('stat-number')) {
                    animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // 延迟观察，等待元素被创建
        setTimeout(() => {
            document.querySelectorAll('.stat-number').forEach(num => {
                observer.observe(num);
            });
        }, 100);
    }
    
    function animateNumber(element) {
        const finalText = element.textContent;
        const finalNumber = parseInt(finalText.replace(/[^\d]/g, '')) || 0;
        
        if (finalNumber === 0) return;
        
        const suffix = finalText.replace(/[\d]/g, '');
        const duration = 2000;
        const startTime = Date.now();
        
        function updateNumber() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(finalNumber * easeOutQuart(progress));
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        updateNumber();
    }
    
    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
    
    function addSmoothScrolling() {
        // 平滑滚动到锚点
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')) {
                const href = e.target.getAttribute('href');
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
            }
        });
    }
    
    // 添加更多精美的交互效果
    function addAdvancedEffects() {
        // 鼠标悬停时的粒子效果
        document.addEventListener('mousemove', function(e) {
            if (Math.random() > 0.98) { // 降低频率
                createParticle(e.clientX, e.clientY);
            }
        });
    }
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            opacity: 0.7;
            animation: particleFloat 1.5s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
    
    // 添加粒子动画样式
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) scale(1);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-50px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
    
    // 启用高级效果（可选）
    // addAdvancedEffects();
});