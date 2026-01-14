<script setup>
import { ref } from 'vue';
import EditBucketModal from './EditBucketModal.vue';

defineProps(['categories']);
const emit = defineEmits(['add-category', 'remove-category', 'edit-category']);

const newCatName = ref('');
const newCatKeywords = ref('');
const isModalOpen = ref(false);
const categoryToEdit = ref(null);

const submitCategory = () => {
  if (newCatName.value && newCatKeywords.value) {
    emit('add-category', newCatName.value, newCatKeywords.value);
    newCatName.value = '';
    newCatKeywords.value = '';
  }
};

const openEditModal = (cat) => {
  categoryToEdit.value = cat;
  isModalOpen.value = true;
};
</script>

<template>
  <div>
    <h3>Smart Buckets</h3>
    <div class="cat-form">
      <input v-model="newCatName" placeholder="Name (e.g. Forests)" />
      <input v-model="newCatKeywords" placeholder="Keywords (tree, log)" />
      <button class="add-btn full-width" @click="submitCategory">Create Bucket</button>
    </div>

    <ul class="feed-list">
      <li v-for="cat in categories" :key="cat.name" class="feed-item">
        <span class="feed-name">{{ cat.name }}</span>
        <div class="actions">
          <button class="icon-btn edit-btn" @click="openEditModal(cat)">✏️</button>
          <button class="icon-btn danger-btn" @click="$emit('remove-category', cat.name)">x</button>
        </div>
      </li>
    </ul>

    <EditBucketModal 
      :is-open="isModalOpen"
      :category="categoryToEdit"
      @close="isModalOpen = false"
      @save="(p) => emit('edit-category', p.originalName, p.newName, p.newKeywords)"
    />
  </div>
</template>

<style scoped>
/* Specific styles for buckets */
.cat-form { display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px; }
.cat-form input { padding: 5px; border: 1px solid #ccc; border-radius: 4px; }
.add-btn { padding: 5px 10px; cursor: pointer; }
.full-width { width: 100%; }
.feed-list { padding: 0; margin: 0; list-style: none; }
.feed-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
.feed-name { font-size: 0.85rem; color: #555; }
.actions { display: flex; gap: 5px; }
.icon-btn { background: none; border: none; cursor: pointer; padding: 0; }
.edit-btn { font-size: 0.9rem; opacity: 0.6; }
.edit-btn:hover { opacity: 1; }
.danger-btn { color: #dc3545; border: 1px solid #dc3545; border-radius: 4px; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; }
.danger-btn:hover { background: #dc3545; color: white; }
</style>