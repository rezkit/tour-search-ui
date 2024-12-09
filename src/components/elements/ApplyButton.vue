<script setup lang="ts">
import { toRef, ref } from 'vue'
// Properties and events.
//
const emit = defineEmits(['process:applyFilters'])
const props = defineProps<{
  styleOpts?: string
  text?: string
}>()
// Main variables.
//
const styleOpts = toRef(props, 'styleOpts')
const text = props.text ? toRef(props, 'text') : ref('Apply')
// Functions.
//
const processClick = function processClick() {
  emit('process:applyFilters')
}
</script>
<template>
  <button
    class="rk-btn"
    :class="[styleOpts]"
    type="button"
    @click="processClick"
  >
    {{ text }}
  </button>
</template>
