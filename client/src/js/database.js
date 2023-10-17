import { openDB } from 'idb';

 const initdb = async () => {
  await openDB('jateDB', 1, {
     upgrade(db) {
       if (db.objectStoreNames.contains('jate')) {
         console.log('jate store already exists');
         return;
       }
       db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
       console.log('jate store created');
     },
   });
   console.log('DB OPEN');
 };

 // Added logic to a method that accepts some content and adds it to the database
 export const putDb = async (content) => {
   console.log('PUT request sent to the jateDB');
   const jateDb = await openDB('jateDB', 1);
   const tx = jateDb.transaction('jate', 'readwrite');
   const store = tx.objectStore('jate');
   const request = store.put({ id: 0, jateContent: content });
   const result = await request;
   console.log('Data successfully saved to jate', result);
 };

 // Added logic for a method that gets all the content from the database

 export const getDb = async () => {
   // console.error('getDb not implemented');
   console.log('GET all from the jateDB');
   const jateDb = await openDB('jateDB', 1);
   const tx = jateDb.transaction('jate', 'readonly');
   const store = tx.objectStore('jate');
   const request = store.get(0);
   const result = await request;
   console.log('Data successfully pulled from jateDB', result);
   return result;
 };