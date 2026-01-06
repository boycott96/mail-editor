<template>
  <div class="editor-wrapper">
    <div ref="editor" class="editor" contenteditable @input="onInput"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { EditorUtils } from "@/editor/editor-utils";
import { serializeMailHtml } from "@/editor/mail-serializer";

const editor = ref(null);
let utils = null;

onMounted(() => {
  utils = new EditorUtils(editor.value);
});

function onInput() {
  // 只做数据同步，不修 DOM
}

function setEditorContent(html) {
  editor.value.innerHTML = html;
}

function getSendHtml() {
  return serializeMailHtml(editor.value);
}

defineExpose({
  setEditorContent,
  getSendHtml,
  utils,
});
</script>

<style>
.editor {
  min-height: 200px;
  outline: none;
  white-space: pre-wrap;
}
</style>
