<script setup lang="ts">
import { ref, toRef } from 'vue'
// Properties and events.
//
const emit = defineEmits(['process:clearFilter'])
const props = defineProps<{
  filterValue: string
  eventType?: string
}>()
// Main variables.
//
const filterValue = toRef(props, 'filterValue')
const eventType = props.eventType ? toRef(props, 'eventType') : ref('emit')
// Functions.
//
const processClick = function processClick() {
  if (eventType.value === 'window') {
    window.postMessage({
      rk_clear_filter: filterValue.value,
    })
  } else {
    emit('process:clearFilter', filterValue.value)
  }
}
</script>

<template>
  <p class="rkts-refine-tag" @click="processClick">
    <i class="rkts-refine-tag__icon fontello icon-sys-close"></i>
    <span class="rkts-refine-tag__text">{{ filterValue }}</span>
  </p>
</template>

<style lang="scss"></style>
