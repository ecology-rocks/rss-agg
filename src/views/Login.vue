<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const { login, register } = useAuth();
const router = useRouter();

const email = ref('');
const password = ref('');
const isRegistering = ref(false);
const errorMsg = ref('');

const handleAuth = async () => {
  errorMsg.value = ''; // Reset error
  try {
    if (isRegistering.value) await register(email.value, password.value);
    else await login(email.value, password.value);
    router.push('/'); 
  } catch (e) {
    errorMsg.value = e.message;
  }
};
</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-box">
      <h2>{{ isRegistering ? 'Create Account' : 'Welcome Back' }}</h2>
      
      <form @submit.prevent="handleAuth" class="auth-form">
        <div class="input-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="name@example.com" required />
        </div>
        
        <div class="input-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="••••••••" required />
        </div>

        <button type="submit" class="primary-btn">
          {{ isRegistering ? 'Sign Up' : 'Log In' }}
        </button>
      </form>

      <div class="toggle-link">
        <button class="link-btn" @click="isRegistering = !isRegistering">
          {{ isRegistering ? 'Already have an account? Log in' : 'New here? Create account' }}
        </button>
      </div>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<style scoped>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* Centers vertically too */
}

.auth-box {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.primary-btn {
  background-color: #007bff;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.primary-btn:hover {
  background-color: #0056b3;
}

.toggle-link {
  margin-top: 20px;
  text-align: center;
}

.link-btn {
  background: none;
  border: none;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9rem;
}

.error {
  color: #d9534f;
  background: #f9d6d5;
  padding: 10px;
  border-radius: 4px;
  margin-top: 15px;
  text-align: center;
  font-size: 0.9rem;
}
</style>