<script setup lang="ts">
import { toRef, computed } from 'vue'
// Properties and events.
//
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: boolean
  title: string
  count?: number
}>()
// Main variables.
//
const title = toRef(props, 'title')
const count = toRef(props, 'count')
// Model.
//
const value = computed({
  get(): any {
    return props.modelValue || false
  },

  set(value: any) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <li class="rkts-list-checkbox">
    <div class="rkts-list-checkbox__container">
      <div
        class="rkts-list-checkbox__choice"
        :class="{ active: value }"
        @click.stop
      >
        <input
          v-model="value"
          class="rk-input rk-input--checkbox"
          type="checkbox"
        />
      </div>
      <p class="rkts-list-checkbox__label">
        {{ title }}
        <b v-if="count" class="rk-text rk-text--count">({{ count }})</b>
      </p>
    </div>
    <slot></slot>
  </li>
</template>

<style lang="scss"></style>
