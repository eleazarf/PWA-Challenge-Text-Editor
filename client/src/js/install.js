const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event

// Add an event listener for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the 'beforeinstallprompt' event object in the deferredPrompt property
    window.deferredPrompt = event;
 
    // Toggle the 'hidden' class of the 'butInstall' element to make it visible
    butInstall.classList.toggle('hidden', false);
 });
//

// TODO: Implement a click event handler on the `butInstall` element
// Add a click event listener to the 'butInstall' button
butInstall.addEventListener('click', async () => {
    // Get the 'beforeinstallprompt' event from the 'deferredPrompt' property
    const promptEvent = window.deferredPrompt;
 
    // Check if there is no prompt event available
    if (!promptEvent) {
        return; // Exit the function if there is no prompt event
    }
 
    // Trigger the installation prompt
    promptEvent.prompt();
 
    // Reset the 'deferredPrompt' property to null
    window.deferredPrompt = null;
 
    // Hide the 'butInstall' button by toggling the 'hidden' class
    butInstall.classList.toggle('hidden', true);
 });
//

// TODO: Add an handler for the `appinstalled` event
// Add an event listener for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
    // When the app is successfully installed, set 'deferredPrompt' to null
    window.deferredPrompt = null;
  });
// 