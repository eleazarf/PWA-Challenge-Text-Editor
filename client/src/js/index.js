// Import the Workbox library for service workers
import { Workbox } from 'workbox-window';

// Import the Editor class from './editor.js'
import Editor from './editor';

// Import the database module (Assuming it initializes IndexedDB or does other related tasks)
import './database';

// Import the main stylesheet
import '../css/style.css';

// Clear the content of the 'main' element
const main = document.querySelector('#main');
main.innerHTML = '';

// Function to display a loading spinner
const loadSpinner = () => {
  // Create a spinner element and append it to the 'main' element
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner" />
    </div>
  `;
  main.appendChild(spinner);
};

// Initialize the Editor class to create the text editor
const editor = new Editor();

// Check if the Editor was successfully initialized
if (typeof editor === 'undefined') {
  // Display a loading spinner while initializing the Editor
  loadSpinner();
}

// Check if the browser supports service workers
if ('serviceWorker' in navigator) {
  // Create a Workbox service worker instance and register it
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  // Display an error message if service workers are not supported in this browser
  console.error('Service workers are not supported in this browser.');
}
