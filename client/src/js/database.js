import { openDB } from 'idb';

const initdb = async () =>
  openDB('JATE', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('JATE')) {
        console.log('JATE database already exists');
        return;
      }
      db.createObjectStore('JATE', { keyPath: 'id', autoIncrement: true });
      console.log('JATE database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT request sent to the jateDb');
  const jateDb = await openDB('JATE', 1);
  const tx = jateDb.transaction('JATE', 'readwrite');
  const store = tx.objectStore('JATE');
  const request = store.put({ id: id, jateContent: content });
  const result = await request;
  console.log('Data successfully saved to jateDb', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.error('getDb not implemented');
  console.log('GET all from the database');
  const jateDb = await openDB('JATE', 1);
  const tx = jateDb.transaction('JATE', 'readonly');
  const store = tx.objectStore('JATE');
  // possibly just store.get(1)
  const request = store.getAll()
  const result = await request;
  console.log('Data successfully pulled from jateDb', result);
  return result;
};

initdb();
