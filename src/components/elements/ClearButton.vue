<script setup lang="ts">
import { toRef, ref } from 'vue'
// Properties and events.
//
const emit = defineEmits(['process:clearFilters'])
const props = defineProps<{
  styleOpts?: string
  filters: any
  text?: string
}>()
// Main variables.
//
const styleOpts = toRef(props, 'styleOpts')
const filters = toRef(props, 'filters')
const text = props.text ? toRef(props, 'text') : ref('Clear')
</script>
<template>
  <button
    class="rk-btn rk-btn--clear"
    :class="[styleOpts]"
    type="button"
    @click="emit('process:clearFilters', filters)"
  >
    <i
      class="rk-icon rk-icon--primary rk-icon--text-xs fontello icon-sys-close me-2"
    ></i>
    {{ text }}
  </button>
</template>
