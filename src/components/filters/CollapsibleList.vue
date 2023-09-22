<script setup lang="ts">
import { toRef } from 'vue'
// Properties and events.
//
const props = defineProps<{
  title: string
}>()
// Main variables.
//
const title = toRef(props, 'title')
</script>

<template>
  <div class="rkts-collapsible-list">
    <div class="rkts-collapsible-list__title">
      <input class="rk-input rk-input--checkbox" type="checkbox" />
      <p class="m-0">{{ title }}</p>
    </div>
    <div class="rkts-collapsible-list__content">
      <ul class="rk-list"></ul>
    </div>
  </div>
</template>

<style lang="scss"></style>
