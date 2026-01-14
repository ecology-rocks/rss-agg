<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  category: Object // { name: 'Forests', keywords: ['tree', 'wood'] }
});

const emit = defineEmits(['close', 'save']);

const formName = ref('');
const formKeywords = ref('');

// When the modal opens or category changes, fill the form
watch(() => props.category, (newVal) => {
  if (newVal) {
    formName.value = newVal.name;
    formKeywords.value = newVal.keywords.join(', ');
  }
}, { immediate: true });

const handleSave = () => {
  emit('save', {
    originalName: props.category.name,
    newName: formName.value,
    newKeywords: formKeywords.value
  });
  emit('close');
};
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h3>Edit Bucket</h3>
      
      <div class="form-group">
        <label>Bucket Name</label>
        <input v-model="formName" placeholder="e.g. Forests" />
      </div>

      <div class="form-group">
        <label>Keywords (comma separated)</label>
        <textarea v-model="formKeywords" rows="3" placeholder="tree, logging, timber"></textarea>
      </div>

      <div class="actions">
        <button class="cancel-btn" @click="$emit('close')">Cancel</button>
        <button class="save-btn" @click="handleSave">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 0.9rem;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Ensures padding doesn't break width */
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.save-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background: none;
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>