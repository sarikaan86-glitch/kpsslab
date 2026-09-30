import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { ExamResult } from './types/exam';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Use specified custom firestore database ID
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Save or update user profile in Firestore
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'KPSS Adayı',
          photoURL: user.photoURL || '',
          lastLoginAt: new Date().toISOString(),
        },
        { merge: true }
      );
    }
    return user;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout Error:', error);
    throw error;
  }
};

// Sync completed exam to Firestore
export const saveExamToFirestore = async (userId: string, examResult: ExamResult): Promise<void> => {
  try {
    const resultRef = doc(db, 'users', userId, 'examResults', examResult.id);
    await setDoc(resultRef, {
      ...examResult,
      userId,
      savedAt: new Date().toISOString(),
    });

    // Update user stats
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const currentStats = userSnap.exists() ? userSnap.data() : {};

    const totalExams = (currentStats.totalExamsCompleted || 0) + 1;
    const highestP3 = Math.max(currentStats.highestP3Score || 0, examResult.estimatedP3Score);
    const totalXp = (currentStats.totalXp || 0) + Math.round(examResult.totalNet * 5);

    await setDoc(
      userRef,
      {
        totalExamsCompleted: totalExams,
        highestP3Score: highestP3,
        totalXp,
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error saving exam to Firestore:', error);
  }
};

// Fetch user past exams from Firestore
export const fetchUserExamsFromFirestore = async (userId: string): Promise<ExamResult[]> => {
  try {
    const resultsColl = collection(db, 'users', userId, 'examResults');
    const q = query(resultsColl, orderBy('date', 'desc'), limit(30));
    const snap = await getDocs(q);

    return snap.docs.map((docSnap) => docSnap.data() as ExamResult);
  } catch (error) {
    console.error('Error fetching exams from Firestore:', error);
    return [];
  }
};
