<script setup lang="ts">
import { toRef, computed } from 'vue'
// Properties and events.
//
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: any
  title: string
  count?: number
  prefix: string
  term: string
}>()
// Main variables.
//
const term = toRef(props, 'term')
const title = toRef(props, 'title')
const count = toRef(props, 'count')
const prefix = toRef(props, 'prefix')
// Model.
//
const value = computed({
  get(): any {
    return props.modelValue || []
  },

  set(value: any) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <li class="rkts-list-checkbox">
    <div class="rkts-list-checkbox__container" @click.stop>
      <div
        class="rkts-list-checkbox__choice"
        :class="{ active: value.includes(term) }"
      >
        <input
          v-model="value"
          :id="`${prefix}-${term}`"
          class="rk-input rk-input--checkbox"
          :value="term"
          type="checkbox"
        />
      </div>
      <label class="rkts-list-checkbox__label" :for="`${prefix}-${term}`">
        {{ title }}
        <b v-if="count" class="rk-text rk-text--count">({{ count }})</b>
      </label>
    </div>
    <slot></slot>
  </li>
</template>

<style lang="scss"></style>
