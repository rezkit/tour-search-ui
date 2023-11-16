<script setup lang="ts">
import { toRef } from 'vue'
// Properties and events.
//
const props = defineProps<{
  count: number
  label: string
  message: string
  styleOpts?: string
}>()
// Main variables.
//
const label = toRef(props, 'label')
const count = toRef(props, 'count')
const message = toRef(props, 'message')
const styleOpts = toRef(props, 'styleOpts')
</script>

<template>
  <div class="rkts-results-count" :class="[styleOpts]">
    <span class="rkts-results-count__label">{{ label }}</span>
    <span class="rkts-results-count__count">{{ count }}</span>
    <span class="rkts-results-count__message">{{ message }}</span>
  </div>
</template>

<style lang="scss"></style>
