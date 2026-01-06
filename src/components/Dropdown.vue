<template>
  <el-dropdown
    trigger="click"
    placement="bottom-start"
    @command="handleCommand"
    max-height="650px"
  >
    <div class="dropdown">
      <div class="icon" v-if="icon">
        <svg-icon :name="icon" />
      </div>
      <div v-else class="label" :style="{ fontFamily: modelValue.value }">
        {{ modelValue.label }}
      </div>
      <div class="arrow">
        <svg-icon class="mini-icon" name="arrow-down" />
      </div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in dataList"
          :key="item.value"
          :command="item"
        >
          <div
            :style="{
              width: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: item.value,
              fontSize: '12px',
              color: '#13181d',
            }"
          >
            <div>{{ item.label }}</div>
            <div v-if="item.value === modelValue.value">
              <svg-icon class="small-icon" name="check" />
            </div>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    default: {},
  },
  dataList: {
    type: Array,
    default: () => [],
  },
  family: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleCommand = (command) => {
  emit("update:modelValue", command);
};
</script>
<style lang="scss" scoped>
.dropdown {
  height: 28px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  .icon {
    width: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .label {
    width: 58px;
    color: #13181d;
    font-size: 12px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .arrow {
    width: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:hover {
    background-color: #e8eaed;
  }
}
</style>
