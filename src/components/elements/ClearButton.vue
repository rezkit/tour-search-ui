<script setup lang="ts">
import { toRef, ref } from 'vue'
// Properties and events.
//
const emit = defineEmits(['process:clearFilters'])
const props = defineProps<{
  styleOpts?: string
  text?: string
}>()
// Main variables.
//
const styleOpts = toRef(props, 'styleOpts')
const text = props.text ? toRef(props, 'text') : ref('Clear')
// Functions.
//
const processClick = function processClick() {
  emit('process:clearFilters')
}
</script>
<template>
  <button
    class="rk-btn rk-btn--clear"
    :class="[styleOpts]"
    type="button"
    @click="processClick"
  >
    <i
      class="rk-icon rk-icon--primary rk-icon--text-xs fontello icon-sys-close me-2"
    ></i>
    {{ text }}
  </button>
</template>
