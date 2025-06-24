let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Prevent auto prompt
  deferredPrompt = e;
  installBtn.style.display = 'block';
});

installBtn.addEventListener('click', () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(choice => {
    if (choice.outcome === 'accepted') {
      console.log('PWA installed');
    } else {
      console.log('PWA install dismissed');
    }
    deferredPrompt = null;
    installBtn.style.display = 'none';
  });
});

window.addEventListener('appinstalled', () => {
  console.log('PWA installed via native prompt');
  installBtn.style.display = 'none';
});
