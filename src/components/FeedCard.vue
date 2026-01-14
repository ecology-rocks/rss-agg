<script setup>
import { formatDistanceToNow } from 'date-fns';
defineProps(['item']);
</script>

<template>
  <article class="card">
    <div class="meta">
      <span class="source-tag">{{ item.source }}</span>
      <span class="date">{{ formatDistanceToNow(item.pubDate) }} ago</span>
    </div>
    <h3><a :href="item.link" target="_blank">{{ item.title }}</a></h3>
    <p>{{ item.description }}</p>
    </article>
</template>

<style scoped>
.card { border: 1px solid #ddd; padding: 15px; border-radius: 4px; background: #fff; }
.meta { font-size: 0.8em; color: #666; margin-bottom: 5px; display: flex; justify-content: space-between; }
.source-tag { background: #e0f7fa; padding: 2px 5px; border-radius: 3px; color: #006064; }
h3 { margin: 5px 0 10px 0; font-size: 1.1em; }
</style>