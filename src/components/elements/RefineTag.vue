<script setup lang="ts">
import { toRef } from 'vue'
// Properties and events.
//
const emit = defineEmits(['process:clearFilter'])
const props = defineProps<{
  filterValue: string
}>()
// Main variables.
//
const filterValue = toRef(props, 'filterValue')
// Functions.
//
const processClick = function processClick() {
  emit('process:clearFilter', filterValue.value)
}
</script>

<template>
  <p class="rkts-refine-tag" @click="processClick">
    <i class="rkts-refine-tag__icon fontello icon-sys-close"></i>
    <span class="rkts-refine-tag__text">{{ filterValue }}</span>
  </p>
</template>

<style lang="scss"></style>
