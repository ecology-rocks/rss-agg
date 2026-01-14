<script setup>
import { ref } from 'vue';
defineProps(['feeds', 'hiddenFeeds']);
const emit = defineEmits(['add-feed', 'remove-feed', 'toggle-feed', 'import-opml', 'export-opml']);

const newUrl = ref('');
const fileInput = ref(null); 

const submit = () => {
  if(newUrl.value) {
    emit('add-feed', newUrl.value);
    newUrl.value = '';
  }
}

const triggerImport = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    emit('import-opml', file);
  }
  event.target.value = '';
};
</script>

<template>
  <div>
    <h3>Sources</h3>
    <div class="input-group">
      <input v-model="newUrl" placeholder="RSS URL" @keyup.enter="submit" />
      <button class="add-btn" @click="submit">+</button>
    </div>

    <div class="opml-actions">
      <input 
        type="file" 
        ref="fileInput" 
        accept=".opml,.xml" 
        style="display: none" 
        @change="handleFileChange" 
      />
      
      <button class="opml-btn" @click="triggerImport">
        <span class="icon">📥</span> Import
      </button>
      
      <button class="opml-btn" @click="$emit('export-opml')">
        <span class="icon">📤</span> Export
      </button>
    </div>
    
    <ul class="feed-list">
      <li v-for="feed in feeds" :key="feed" class="feed-item" :class="{ 'muted': hiddenFeeds.includes(feed) }">
        <div class="feed-info">
          <button class="icon-btn toggle-btn" @click="$emit('toggle-feed', feed)">
            <span v-if="hiddenFeeds.includes(feed)">🙈</span>
            <span v-else>👁️</span>
          </button>
          <span class="feed-name" :title="feed">{{ feed }}</span>
        </div>
        <button class="icon-btn danger-btn" @click="$emit('remove-feed', feed)">x</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Existing Styles */
.input-group { display: flex; gap: 5px; margin-bottom: 5px; }
.input-group input { flex: 1; padding: 5px; border: 1px solid #ccc; border-radius: 4px; }
.add-btn { padding: 5px 10px; cursor: pointer; }

/* NEW Styles for OPML Buttons */
.opml-actions {
  display: flex;
  gap: 8px; /* Space between buttons */
  margin-bottom: 15px;
}

.opml-btn {
  flex: 1; /* Each button takes 50% width */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  
  font-size: 0.85rem;
  padding: 6px 10px;
  
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #555;
  cursor: pointer;
  transition: all 0.2s;
}

.opml-btn:hover {
  background-color: #f8f9fa;
  border-color: #bbb;
  color: #333;
}

.icon {
  font-size: 1rem;
  line-height: 1;
}

/* List Styles */
.feed-list { padding: 0; margin: 0; list-style: none; }
.feed-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
.feed-item.muted { opacity: 0.5; }
.feed-info { display: flex; align-items: center; gap: 8px; overflow: hidden; }
.feed-name { font-size: 0.85rem; color: #555; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px; }
.icon-btn { background: none; border: none; cursor: pointer; padding: 0; }
.toggle-btn { font-size: 1rem; width: 20px; }
.danger-btn { color: #dc3545; border: 1px solid #dc3545; border-radius: 4px; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; }
.danger-btn:hover { background: #dc3545; color: white; }
</style>