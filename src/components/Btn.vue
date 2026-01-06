<template>
  <div class="btn" :class="{ active: modelValue }">
    <svg-icon :name="icon" @click="handleClick" />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "bold",
  },
});
const emit = defineEmits(["update:modelValue", "click"]);
const handleClick = () => {
  emit("update:modelValue", !props.modelValue);
  emit("click");
};
</script>

<style lang="scss" scoped>
.btn {
  height: 28px;
  width: 28px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #e8eaed;
  }
  &.active {
    background-color: #dce0e4;
  }
}
</style>
