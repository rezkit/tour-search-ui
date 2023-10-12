<script setup lang="ts">
import { toRef } from 'vue'
// Properties and events.
//
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
  <div class="rkts-result-card">
    <template v-if="customCard">
      <slot :data="data"></slot>
    </template>
    <div v-else class="rk-card">
      <div class="rk-card__image rk-card__image--max-height">
        <img
          src="https://placehold.co/325x200"
          class="img-fluid rounded"
          alt="Placeholder"
        />
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
