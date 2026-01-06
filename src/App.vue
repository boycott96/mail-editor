<script setup>
import { ref } from "vue";
import Editor from "./components/Editor.vue";
import { demo } from "@/model/mail_html";

const htmlContent = ref(demo.content);

const editorRef = ref();
const handleGetHtml = () => {
  if (editorRef.value) {
    const html = editorRef.value.getHtml();
    console.log("获取到的 HTML:", html);
    htmlContent.value = html; // 同步到输入框
  }
};
</script>

<template>
  <div style="padding: 20px">
    <div style="margin-bottom: 20px">
      <button @click="handleGetHtml" style="margin-right: 10px">
        获取 HTML
      </button>
      <button @click="htmlContent = '<p></p>'">清空内容</button>
    </div>

    <div>
      <Editor ref="editorRef" v-model="htmlContent" />
    </div>
  </div>
</template>
