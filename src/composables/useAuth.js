import { ref, onMounted, onUnmounted } from 'vue';
import { auth } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';

const user = ref(null);

export function useAuth() {
  // Listen to auth changes globally
  let unsubscribe;
  onMounted(() => {
    unsubscribe = onAuthStateChanged(auth, (u) => user.value = u);
  });
  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return { user, login, register, logout };
}