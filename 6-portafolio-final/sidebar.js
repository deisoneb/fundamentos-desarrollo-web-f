document.addEventListener('DOMContentLoaded', () => {
    // Side menu item active state
    const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
    sideLinks.forEach(item => {
        const li = item.parentElement;
        item.addEventListener('click', () => {
            // Remove active state from all menu items
            sideLinks.forEach(i => {
                i.parentElement.classList.remove('active');
            });
            // Add active state to clicked item
            li.classList.add('active');
            
            // Close sidebar on mobile after selection
            if (window.innerWidth < 768) {
                sidebar.classList.add('close');
            }
        });
    });

    // Sidebar and content elements
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content') || document.body;

    // Create menu toggle button
    const createMenuToggle = () => {
        const menuToggle = document.createElement('button');
        menuToggle.innerHTML = '<i class="bx bx-menu"></i>';
        menuToggle.classList.add('sidebar-toggle');
        menuToggle.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 3000;
            background: #5512f3;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        return menuToggle;
    };

    // Create and append menu toggle button
    const menuToggle = createMenuToggle();
    document.body.insertBefore(menuToggle, sidebar);

    // Sidebar toggle functionality
    const toggleSidebar = () => {
        sidebar.classList.toggle('close');
        
        // Adjust content width based on sidebar state
        if (sidebar.classList.contains('close')) {
            content.style.width = 'calc(100% - 60px)';
            content.style.left = '60px';
        } else {
            content.style.width = 'calc(100% - 230px)';
            content.style.left = '230px';
        }
    };

    // Add click event to menu toggle
    menuToggle.addEventListener('click', toggleSidebar);

    // Responsive sidebar handling
    const handleResponsiveness = () => {
        const screenWidth = window.innerWidth;
        
        if (screenWidth < 768) {
            // Mobile/Tablet: Close sidebar
            sidebar.classList.add('close');
            content.style.width = '100%';
            content.style.left = '0';
        } else {
            // Desktop: Open sidebar
            sidebar.classList.remove('close');
            content.style.width = 'calc(100% - 230px)';
            content.style.left = '230px';
        }
    };

    // Initial responsiveness check
    handleResponsiveness();

    // Responsiveness on window resize
    window.addEventListener('resize', handleResponsiveness);

    // Theme toggler (if you have a theme toggle switch)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', function () {
            if (this.checked) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        });
    }

    // Touch and swipe support
    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchDiff = touchEndX - touchStartX;
        
        // Swipe to open/close sidebar
        if (Math.abs(touchDiff) > 50) {
            if (touchDiff > 0 && sidebar.classList.contains('close')) {
                // Swipe right to open
                toggleSidebar();
            } else if (touchDiff < 0 && !sidebar.classList.contains('close')) {
                // Swipe left to close
                toggleSidebar();
            }
        }
    });
});