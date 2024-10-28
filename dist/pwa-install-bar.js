// pwaInstallBar.js
class PWAInstallBar {
    constructor(config) {
        this.config = {
            appName: config.appName || 'My PWA App',
            appUrl: config.appUrl || window.location.host,
            appIcon: config.appIcon || null,
            androidInstructions: config.androidInstructions || '/android-instructions.jpg',
            iosInstructions: config.iosInstructions || '/ios-instructions.jpg',
            backgroundColor: config.backgroundColor || '#000000',
            buttonColor: config.buttonColor || '#9AE6B4',
            textColor: config.textColor || '#FFFFFF',
            buttonText: config.buttonText || 'Instalar',
            zIndex: config.zIndex || 9999
        };

        this.platform = this.detectPlatform();
        this.init();
    }

    detectPlatform() {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod|mac/.test(userAgent)) return 'ios';
        if (/android/.test(userAgent)) return 'android';
        return 'other';
    }

    createStyles() {
        const styles = `
            .pwa-install-bar {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: ${this.config.backgroundColor};
                padding: 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-top-left-radius: 16px;
                border-top-right-radius: 16px;
                box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease-in-out;
                z-index: ${this.config.zIndex};
            }

            .pwa-install-bar.hidden {
                transform: translateY(100%);
            }

            .pwa-app-info {
                display: flex;
                align-items: center;
                gap: 12px;
                flex: 1;
            }

            .pwa-app-icon {
                width: 40px;
                height: 40px;
                border-radius: 8px;
                background-image: url(${this.config.appIcon});
                background-size: cover;
                background-position: center;
            }

            .pwa-app-details {
                color: ${this.config.textColor};
                flex: 1;
            }

            .pwa-app-name {
                font-weight: bold;
                margin: 0;
            }

            .pwa-app-url {
                margin: 0;
                font-size: 14px;
                opacity: 0.8;
            }

            .pwa-install-button {
                background: ${this.config.buttonColor};
                color: #000;
                border: none;
                padding: 8px 24px;
                border-radius: 24px;
                font-weight: 500;
                cursor: pointer;
                margin-right: 12px;
            }

            .pwa-close-bar-button {
                background: none;
                border: none;
                color: ${this.config.textColor};
                padding: 8px;
                cursor: pointer;
                opacity: 0.8;
                transition: opacity 0.2s;
            }

            .pwa-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease-in-out;
                z-index: ${this.config.zIndex + 1};
            }

            .pwa-modal.active {
                display: flex;
                opacity: 1;
            }

            .pwa-modal-content {
                background: white;
                padding: 24px;
                border-radius: 16px;
                max-width: 90%;
                max-height: 90%;
                position: relative;
                transform: scale(0.9);
                transition: transform 0.3s ease-in-out;
            }

            .pwa-modal.active .pwa-modal-content {
                transform: scale(1);
            }

            .pwa-modal-close-button {
                position: absolute;
                top: 16px;
                right: 16px;
                background: #f3f4f6;
                border: none;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.2s;
            }

            .pwa-modal-close-button:hover {
                background: #e5e7eb;
            }

            .pwa-modal-close-button::before,
            .pwa-modal-close-button::after {
                content: '';
                position: absolute;
                width: 16px;
                height: 2px;
                background: #4b5563;
                transform: rotate(45deg);
            }

            .pwa-modal-close-button::after {
                transform: rotate(-45deg);
            }

            .pwa-modal img {
                max-width: 100%;
                height: auto;
                display: block;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    createHTML() {
        const instructionsImage = this.platform === 'ios'
            ? this.config.iosInstructions
            : this.config.androidInstructions;

        const html = `
            <div id="pwaInstallBar" class="pwa-install-bar">
                <div class="pwa-app-info">
                    <div class="pwa-app-icon"></div>
                    <div class="pwa-app-details">
                        <p class="pwa-app-name">${this.config.appName}</p>
                        <p class="pwa-app-url">${this.config.appUrl}</p>
                    </div>
                </div>
                <button class="pwa-install-button" onclick="pwaInstallBar.openModal()">${this.config.buttonText}</button>
                <button class="pwa-close-bar-button" onclick="pwaInstallBar.hideInstallBar()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>

            <div class="pwa-modal" id="pwaInstallModal">
                <div class="pwa-modal-content">
                    <button class="pwa-modal-close-button" onclick="pwaInstallBar.closeModal()"></button>
                    <img src="${instructionsImage}" alt="Instruções de instalação">
                </div>
            </div>
        `;

        const div = document.createElement('div');
        div.innerHTML = html;
        document.body.appendChild(div);
    }

    init() {
        if (sessionStorage.getItem('pwaInstallBarClosed')) return;

        this.createStyles();
        this.createHTML();

        // Close modal when clicking outside
        document.getElementById('pwaInstallModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.closeModal();
        });

        // Make methods available globally
        window.pwaInstallBar = this;
    }

    hideInstallBar() {
        document.getElementById('pwaInstallBar').classList.add('hidden');
        sessionStorage.setItem('pwaInstallBarClosed', 'true');
    }

    openModal() {
        document.getElementById('pwaInstallModal').classList.add('active');
    }

    closeModal() {
        document.getElementById('pwaInstallModal').classList.remove('active');
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.PWAInstallBar = PWAInstallBar;
}
