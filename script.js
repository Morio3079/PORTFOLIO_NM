document.addEventListener('DOMContentLoaded', () => {
    const logContainer = document.getElementById('boot-log');
    const loginForm = document.getElementById('login-form');
    const passwordField = document.getElementById('password-field');
    const authStatus = document.getElementById('auth-status');
    const bootScreen = document.getElementById('boot-screen');
    const desktop = document.getElementById('desktop');

    const logs = [
        "> BOOTING UITOPIA_OS kernel v1.0.7...",
        "> LOADING ENCRYPTION MODULE... OK",
        "> SEARCHING FOR AUTHORIZED USERS...",
        "> EXTERNAL ACCESS DETECTED."
    ];

    const passText = "••••••••••••"; // 入力される伏せ字
    let logIdx = 0;

    // 1. ログの順次表示
    function showLogs() {
        if (logIdx < logs.length) {
            const p = document.createElement('p');
            p.textContent = logs[logIdx];
            logContainer.appendChild(p);
            logIdx++;
            setTimeout(showLogs, 500);
        } else {
            setTimeout(showForm, 500);
        }
    }

    // 2. ログインフォーム出現
    function showForm() {
        loginForm.style.display = 'block';
        setTimeout(typePassword, 800);
    }

    // 3. パスワード自動タイピング
    let charIdx = 0;
    function typePassword() {
        if (charIdx < passText.length) {
            passwordField.textContent += passText[charIdx];
            charIdx++;
            setTimeout(typePassword, 120);
        } else {
            setTimeout(verify, 600);
        }
    }

    // 4. 認証中演出
    function verify() {
        authStatus.textContent = "VERIFYING...";
        setTimeout(() => {
            authStatus.style.color = "#fff";
            authStatus.textContent = "ACCESS GRANTED. WELCOME.";
            setTimeout(enterDesktop, 1200);
        }, 1500);
    }

    // 5. デスクトップへ移行
    function enterDesktop() {
        bootScreen.style.opacity = '0';
        desktop.classList.remove('hidden');
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 1500);
    }

    // 時計の更新
    function updateClock() {
        const now = new Date();
        document.getElementById('clock').textContent = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);

    // 実行開始
    showLogs();
});