<template>
  <div class="color-select">
    <div class="color-btn">
      <svg-icon :name="icon" :color="modelValue" />
    </div>
    <el-dropdown trigger="click">
      <div class="select-btn">
        <svg-icon
          class="mini-icon"
          name="arrow-down"
          @click="() => emit('change', modelValue)"
        />
      </div>
      <template #dropdown>
        <div class="color-picker">
          <!-- 默认颜色选项 -->
          <div
            class="default-color-item"
            @click="handleColorSelect(defaultColor)"
          >
            <span class="color-label">默认颜色</span>
          </div>

          <!-- 颜色网格 -->
          <div class="color-grid">
            <div
              v-for="(color, index) in MAIL_COLOR_LIST"
              :key="index"
              class="color-item"
              :class="{ selected: isSelectedColor(color) }"
              @click="handleColorSelect(rgbToHex(color))"
            >
              <div
                class="color-swatch"
                :style="{ backgroundColor: rgbToHex(color) }"
              ></div>
            </div>
          </div>
        </div>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { MAIL_COLOR_LIST } from "@/model/mail_constants";

const DEFAULT_TEXT_COLOR = "#000000";

// 定义组件属性
const props = defineProps({
  modelValue: {
    type: String,
    default: DEFAULT_TEXT_COLOR,
  },
  defaultColor: {
    type: String,
    default: DEFAULT_TEXT_COLOR,
  },
  icon: {
    type: String,
    default: "text",
  },
});

// 定义组件事件
const emit = defineEmits(["update:modelValue", "change"]);

// 将RGB对象转换为十六进制颜色字符串
const rgbToHex = (color) => {
  const { r, g, b } = color;
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

// 判断颜色是否被选中
const isSelectedColor = (color) => {
  return props.modelValue === rgbToHex(color);
};

// 处理颜色选择
const handleColorSelect = (color) => {
  emit("update:modelValue", color);
  emit("change", color);
};
</script>

<style lang="scss" scoped>
.color-select {
  display: flex;
  align-items: center;
  justify-content: center;

  .color-btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &:hover {
    background-color: #e8eaed;
    .color-btn {
      &:hover {
        background-color: #dce0e6;
      }
    }
    .select-btn {
      &:hover {
        background-color: #dce0e6;
      }
    }
  }
  .select-btn {
    height: 28px;
    padding: 0 2px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
.color-picker {
  padding: 12px;
  max-width: 320px;

  .default-color-item {
    display: flex;
    user-select: none;
    align-items: center;
    height: 28px;
    justify-content: center;
    margin-bottom: 12px;
    border: 1px solid #e4e7ed;
    border-radius: 6px;
    background-color: #fafbfc;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f0f2f5;
    }
    .color-label {
      font-size: 14px;
      color: #606266;
      font-weight: 500;
    }
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 4px;
  }

  .color-item {
    cursor: pointer;
    border-radius: 4px;
    overflow: hidden;
    transition: all 0.2s ease;
    border: 2px solid transparent;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    &.selected {
      border-color: #409eff;
      box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
    }

    .color-swatch {
      width: 20px;
      height: 20px;
      border-radius: 2px;
    }
  }
}
</style>
