import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION = 'wellbook-tracker';
const DOC_ID = 'project-data';

/** Write full data to Firestore */
export async function saveData(data) {
  if (!db) return;
  try {
    await setDoc(doc(db, COLLECTION, DOC_ID), data);
  } catch (err) {
    console.error('Firestore save failed', err);
  }
}

/** Read full data from Firestore */
export async function loadData() {
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, COLLECTION, DOC_ID));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.error('Firestore load failed', err);
    return null;
  }
}

/** Subscribe to real-time updates */
export function subscribeToData(callback) {
  if (!db) return () => {};
  return onSnapshot(
    doc(db, COLLECTION, DOC_ID),
    (snap) => {
      if (snap.exists()) {
        callback(snap.data());
      }
    },
    (err) => {
      console.error('Firestore subscription error', err);
    }
  );
}

/** Partial update */
export async function updateData(updates) {
  if (!db) return;
  try {
    await updateDoc(doc(db, COLLECTION, DOC_ID), updates);
  } catch (err) {
    console.error('Firestore update failed', err);
  }
}
