document.addEventListener('DOMContentLoaded', () => {
    const logContainer = document.getElementById('boot-log');
    const loginForm = document.getElementById('login-form');
    const passwordField = document.getElementById('password-field');
    const authStatus = document.getElementById('auth-status');
    const bootScreen = document.getElementById('boot-screen');
    const desktop = document.getElementById('desktop');

    const logs = [
        "> BOOTING NM_OS kernel v2.0.1...",
        "> LOADING ENCRYPTION MODULE... OK",
        "> SEARCHING FOR AUTHORIZED USERS...",
        "> EXTERNAL ACCESS DETECTED."
    ];

 const passText = "************"; // 入力される伏せ字
    let logIdx = 0;

    // ログ表示
    function showLogs() {
        if (logIdx < logs.length) {
            const p = document.createElement('p');
            p.textContent = logs[logIdx];
            logContainer.appendChild(p);
            logIdx++;
            setTimeout(showLogs, 400);
        } else {
            setTimeout(() => { loginForm.style.display = 'block'; typePassword(); }, 500);
        }
    }

    // パスワード自動入力
    let charIdx = 0;
    function typePassword() {
        if (charIdx < passText.length) {
            passwordField.textContent += passText[charIdx];
            charIdx++;
            setTimeout(typePassword, 80);
        } else {
            verify();
        }
    }

    function verify() {
        authStatus.textContent = "VERIFYING...";
        setTimeout(() => {
            authStatus.style.color = "var(--color-white)";
            authStatus.textContent = "ACCESS GRANTED. WELCOME.";
            setTimeout(enterDesktop, 800);
        }, 1200);
    }

    function enterDesktop() {
        bootScreen.style.opacity = '0';
        setTimeout(() => {
            bootScreen.style.display = 'none';
            desktop.classList.remove('hidden');
        }, 1000);
    }

    // クロック
    setInterval(() => {
        document.getElementById('clock').textContent = new Date().toLocaleTimeString();
    }, 1000);

    // 進化バイナリエフェクト (Works)
    const workNodes = document.querySelectorAll('.work-node');
    workNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const techTag = node.querySelector('.tech-tag');
            const original = techTag.textContent;
            let count = 0;
            const interval = setInterval(() => {
                techTag.textContent = techTag.textContent.split("").map(() => Math.floor(Math.random()*2)).join("");
                if(count++ > 10) { clearInterval(interval); techTag.textContent = original; }
            }, 50);
        });
    });

    showLogs();
});