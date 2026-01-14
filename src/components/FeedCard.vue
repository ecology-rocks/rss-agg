<script setup>
import { ref, onMounted } from 'vue';
import { formatDistanceToNow } from 'date-fns';
import { useSummaries } from '../composables/useSummaries'; // Import logic

const props = defineProps(['item']);
const { fetchSummary, generateAndSaveSummary } = useSummaries(); // Init

const summary = ref(null);
const loading = ref(false);
const checkingCache = ref(true);
const error = ref(null);

onMounted(async () => {
  // Logic is now abstracted away
  const cached = await fetchSummary(props.item);
  if (cached) summary.value = cached;
  checkingCache.value = false;
});

const handleSummarize = async () => {
  loading.value = true;
  error.value = null;

  try {
    summary.value = await generateAndSaveSummary(props.item);
  } catch (e) {
    error.value = "Could not generate summary. Try again.";
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <article class="card">
    <div class="meta">
      <span class="source-tag">{{ item.source }}</span>
      <span class="date">{{ formatDistanceToNow(item.pubDate) }} ago</span>
    </div>
    
    <h3><a :href="item.link" target="_blank">{{ item.title }}</a></h3>
    
    <p v-if="!summary">{{ item.description }}</p>

    <div v-if="summary" class="ai-result">
      <div class="summary-header">
        <strong>⚡ AI Analysis</strong>
        <span class="badge" :class="summary.relevance?.toLowerCase()">{{ summary.relevance }} Priority</span>
      </div>
      <p class="summary-text">{{ summary.summary }}</p>
      
      <div class="tweet-box">
        <small>Draft Tweet:</small>
        <p>"{{ summary.tweet }}"</p>
      </div>
    </div>

    <div v-if="error" class="error-msg">{{ error }}</div>

    <div class="actions">
      <span v-if="checkingCache" class="checking-msg">Checking knowledge base...</span>

      <button 
        v-else-if="!summary" 
        class="ai-btn" 
        @click="handleSummarize" 
        :disabled="loading"
      >
        {{ loading ? 'Analyzing...' : '⚡ Summarize' }}
      </button>
      
      <span v-else class="saved-indicator">
        {{ summary.fromCache ? 'Loaded from Knowledge Base' : 'Saved to Knowledge Base' }}
      </span>
    </div>
  </article>
</template>

<style scoped>
/* Keep your existing styles exactly as they were */
.card { border: 1px solid #ddd; padding: 15px; border-radius: 4px; background: #fff; display: flex; flex-direction: column; gap: 10px; }
.meta { font-size: 0.8em; color: #666; display: flex; justify-content: space-between; }
.source-tag { background: #e0f7fa; padding: 2px 5px; border-radius: 3px; color: #006064; }
h3 { margin: 0; font-size: 1.1em; }
p { margin: 0; color: #444; line-height: 1.4; }
.actions { margin-top: auto; padding-top: 10px; display: flex; align-items: center; justify-content: space-between; min-height: 36px; }
.saved-indicator { font-size: 0.8rem; color: #166534; font-weight: bold; }
.checking-msg { font-size: 0.8rem; color: #999; font-style: italic; }
.ai-btn { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-weight: bold; font-size: 0.9rem; transition: opacity 0.2s; }
.ai-btn:hover { opacity: 0.9; }
.ai-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.ai-result { background: #fdfcff; border: 1px solid #e0e7ff; border-radius: 6px; padding: 12px; margin-top: 5px; }
.summary-header { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem; }
.badge { padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
.badge.high { background: #fee2e2; color: #991b1b; }
.badge.medium { background: #ffedd5; color: #9a3412; }
.badge.low { background: #dcfce7; color: #166534; }
.tweet-box { margin-top: 10px; background: #f3f4f6; padding: 8px; border-radius: 4px; font-size: 0.9rem; font-style: italic; color: #555; }
.error-msg { color: #dc2626; font-size: 0.9rem; }
</style>