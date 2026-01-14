<script setup>
import { computed, ref, watch } from 'vue';
import FeedCard from './FeedCard.vue';

const props = defineProps(['items', 'loading']);
const visibleLimit = ref(15);
const ITEMS_PER_PAGE = 15;

const visibleItems = computed(() => props.items.slice(0, visibleLimit.value));
const hasMoreItems = computed(() => visibleLimit.value < props.items.length);

const loadMore = () => {
  visibleLimit.value += ITEMS_PER_PAGE;
};

// Reset pagination if the underlying list changes (e.g. filter change)
watch(() => props.items, () => {
  visibleLimit.value = ITEMS_PER_PAGE;
});
</script>

<template>
  <div class="feed-stream">
    <div v-if="loading">Loading...</div>
    
    <div class="feed-grid">
      <FeedCard v-for="item in visibleItems" :key="item.id" :item="item" />
    </div>

    <div v-if="hasMoreItems" class="load-more-container">
      <button class="load-more-btn" @click="loadMore">
        Load More ({{ items.length - visibleLimit }} remaining)
      </button>
    </div>
  </div>
</template>

<style scoped>
.feed-grid { display: grid; gap: 15px; }
.load-more-container { display: flex; justify-content: center; margin-top: 30px; margin-bottom: 50px; }
.load-more-btn { background-color: #e0f7fa; color: #006064; border: 1px solid #b2ebf2; padding: 10px 30px; font-size: 1rem; border-radius: 20px; cursor: pointer; transition: all 0.2s; }
.load-more-btn:hover { background-color: #b2ebf2; }
</style>