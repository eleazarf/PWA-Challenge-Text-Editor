// Get the 'Install' button element by its ID
const butInstall = document.getElementById("buttonInstall");

// Listen for the 'beforeinstallprompt' event, triggered when the app is installable
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt event triggered');
    event.preventDefault();
    // Store the event for deferred installation
    window.deferredPrompt = event;
    // Display the 'Install' button by removing the 'hidden' class
    butInstall.classList.toggle('hidden', false);
});

// Add a click event listener to the 'Install' button
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return; // Do nothing if there is no deferred prompt
    }
    // Show the installation prompt
    promptEvent.prompt();
    // Reset the deferred prompt variable as it can be used only once
    window.deferredPrompt = null;
    // Hide the 'Install' button by adding the 'hidden' class
    butInstall.classList.toggle('hidden', true);
});

// Listen for the 'appinstalled' event, triggered when the app is successfully installed
window.addEventListener('appinstalled', (event) => {
    // Clear the deferred prompt as the app has been successfully installed
    console.log('App installed successfully');
    window.deferredPrompt = null;
});
