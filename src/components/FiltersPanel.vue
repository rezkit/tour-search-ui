<script setup lang="ts">
import { toRef } from 'vue'
// Properties and events.
//
const props = defineProps<{
  layout?: string
}>()
// Main variables.
//
const layout = toRef(props, 'layout')
</script>

<template>
  <div class="rk-filters" :class="{ 'rk-filters--horizontal': layout === 'horizontal'}">
    <slot></slot>
  </div>
</template>

<style lang="scss"></style>
