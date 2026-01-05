<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :width="width"
    :height="height"
    :style="{ color }"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#333",
  },
  width: {
    type: String,
    default: "20px",
  },
  height: {
    type: String,
    default: "20px",
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style scoped>
.svg-icon {
  fill: currentColor; /* 关键：让内部路径继承外部 color */
  overflow: hidden;
  vertical-align: -0.15em;
}
</style>
