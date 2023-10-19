<script setup lang="ts">
import { toRef } from 'vue'
// Properties and events.
//
const props = defineProps<{
  styleOpts?: string
  level?: number
}>()
// Main variables.
//
const styleOpts = toRef(props, 'styleOpts')
const level = toRef(props, 'level')
</script>

<template>
  <div
    class="rkts-list-container"
    :class="{ 'rkts-list-container--deeper': level }"
  >
    <ul
      class="rk-list rk-list--no-type"
      :class="[styleOpts, `rk-level-${level}`]"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<style lang="scss"></style>
