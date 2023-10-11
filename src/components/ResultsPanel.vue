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
  <div class="rk-results" :class="{ 'rk-results--fluid': layout === 'fluid'}">
    <slot></slot>
  </div>
</template>

<style lang="scss"></style>
