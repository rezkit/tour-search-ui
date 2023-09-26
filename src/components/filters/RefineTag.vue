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
</script>

<template>
  <div class="rkts-refine-tag" @click="emit('process:clearFilter')">
    <i class="rkts-refine-tag__icon fontello icon-sys-close"></i>
    <span class="rkts-refine-tag__text">{{ filterValue }}</span>
  </div>
</template>

<style lang="scss"></style>
