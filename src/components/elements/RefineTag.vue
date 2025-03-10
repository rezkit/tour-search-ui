<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
// Properties and events.
//
const emit = defineEmits(['process:clearFilter'])
const props = defineProps<{
  filterCount?: number
  filterValue: string
  filterText: string
  eventType?: string
}>()
// Main variables.
//
const filterCount = toRef(props, 'filterCount')
const filterValue = toRef(props, 'filterValue')
const filterText = toRef(props, 'filterText')
const eventType = props.eventType ? toRef(props, 'eventType') : ref('emit')
// Computed.
//
const hasCount = computed(
  () =>
    filterCount.value !== undefined &&
    filterCount.value !== null &&
    filterCount.value >= 0
)
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
    <span class="rkts-refine-tag__text">{{ filterText }}</span>
    <b v-if="hasCount" class="rk-text rk-text--count"> ({{ filterCount }}) </b>
  </p>
</template>

<style lang="scss"></style>
