<template>
  <div>
    <div v-html="preview || ''"></div>
  </div>
</template>

<script lang="ts" setup>
import { marked } from "marked";
let props = defineProps<{ markdown: string }>();
let preview = ref("");

onUpdated(async () => {
  preview.value = marked.parse(props.markdown);
});
onMounted(() => {
  preview.value = marked.parse(props.markdown);
});
</script>
