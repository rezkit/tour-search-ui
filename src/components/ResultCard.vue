<script setup lang="ts">
// Properties and events.
//
import {toRef} from "vue";

const props = defineProps<{
  customCard?: boolean
  data?: object
}>()
// Main variables.
//
const customCard = toRef(props, 'customCard')
const data = toRef(props, 'data')
</script>

<template>
  <div class="rkts-results-card">
    <div v-if="customCard" class="rk-card">
      <slot></slot>
    </div>
    <div v-else class="rk-card">
      <div class="rk-card__image rk-card__image--max-height">
        <img src="https://placehold.co/325x200" class="img-fluid rounded" alt="Placeholder">
      </div>
      <div class="rk-card__body">
        <details>
          <summary>Result</summary>
          {{ data }}
        </details>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
