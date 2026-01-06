<template>
  <div class="edit-content"></div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  preserveOriginalStyles: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.editor-content {
  flex: 1;
  padding: 16px;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  min-height: 400px;
  overflow-y: auto;
  white-space: pre-wrap; /* 保留换行和空格 */
  word-wrap: break-word;
}
</style>
