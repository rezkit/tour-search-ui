<script setup lang="ts">
import { toRef } from 'vue'
// Properties and events.
//
const emit = defineEmits(['process:clearFilters'])
const props = defineProps<{
  title: string,
}>()
// Main variables.
//
const title = toRef(props, 'title')
</script>

<template>
  <div class="rkts-collapsible-list">
    <div class="rkts-collapsible-list__title">
      <input class="rk-input rk-input--checkbox" type="checkbox" />
      <p class="label m-0">{{ title }}</p>
    </div>
    <div class="rkts-collapsible-list__content">
      <ul class="rk-list" >
        <li>
          <slot></slot>
        </li>
        <li></li>
      </ul>
    </div>
    <button class="rk-btn rk-btn--clear" type="button" @click="emit('process:clearFilters')">
      <i class="rk-icon rk-icon--primary rk-icon--text-xs fontello icon-sys-close me-2"></i>
      Clear
    </button>
  </div>
</template>

<style lang="scss"></style>
