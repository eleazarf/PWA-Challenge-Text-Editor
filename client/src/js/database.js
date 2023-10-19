import { openDB } from 'idb';

// Initialize the 'jate' IndexedDB database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      // Check if the 'jate' database already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create the 'jate' object store with auto-incrementing keys
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function to put data into the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Open a connection to the 'jate' database with the specified version
  const contactDb = await openDB('jate', 1);

  // Create a new read-write transaction for the 'jate' object store
  const tx = contactDb.transaction('jate', 'readwrite');

  // Access the 'jate' object store
  const store = tx.objectStore('jate');

  // Use the .put() method to store data in the object store
  const request = store.put({ id: 1, value: content });

  // Wait for the request to complete and log the result
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that retrieves all content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Open a connection to the 'jate' database with the specified version
  const contactDb = await openDB('jate', 1);

  // Create a new read-only transaction for the 'jate' object store
  const tx = contactDb.transaction('jate', 'readonly');

  // Access the 'jate' object store
  const store = tx.objectStore('jate');

  // Use the .getAll() method to retrieve all data from the object store
  const request = store.getAll();

  // Wait for the request to complete and log the result
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

// Initialize the 'jate' IndexedDB database during script execution
initdb();
