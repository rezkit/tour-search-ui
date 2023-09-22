<script setup lang="ts">
import { toRef } from 'vue'
// Properties and events.
//
const props = defineProps<{
  title: string
  text: string
}>()
// Main variables.
//
const title = toRef(props, 'title')
const text = toRef(props, 'text')
</script>

<template>
  <div class="rkts-description-list">
    <div class="rkts-description-list__title">
      <input class="rk-input rk-input--checkbox" type="checkbox" />
      <p class="m-0">{{ title }}</p>
    </div>
    <div class="rkts-description-list__text">
      {{ text }}
      <hr class="rkts-description-list__line-break" />
    </div>
  </div>
</template>

<style lang="scss"></style>
