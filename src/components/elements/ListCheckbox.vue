<script setup lang="ts">
import { toRef, computed } from 'vue'
import Spinner from '@/components/elements/Spinner.vue'
// Properties and events.
//
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: any
  title: string
  count?: number
  prefix: string
  term: string
  loading?: boolean
  activeSection?: boolean
}>()
// Main variables.
//
const term = toRef(props, 'term')
const title = toRef(props, 'title')
const count = toRef(props, 'count')
const prefix = toRef(props, 'prefix')
const loading = toRef(props, 'loading')
const activeSection = toRef(props, 'activeSection')
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
// Computed variables.
//
const isInactive = computed(() => {
  if (count.value && count.value > 0) return false
  if (
    count.value === 0 &&
    value.value.includes(term.value) &&
    !activeSection.value
  )
    return true
  return !(activeSection.value && count.value === 0)
})
</script>

<template>
  <li class="rkts-list-checkbox" :class="{ 'no-option': count === 0 }">
    <div class="rkts-list-checkbox__container" @click.stop>
      <div
        class="rkts-list-checkbox__choice"
        :class="{
          active: value.includes(term),
          inactive: isInactive,
        }"
      >
        <input
          v-model="value"
          :id="`${prefix}-${term}`"
          class="rk-input rk-input--checkbox"
          :value="term"
          type="checkbox"
        />
      </div>
      <label
        class="rkts-list-checkbox__label"
        :for="`${prefix}-${term}`"
        :class="{
          active: value.includes(term),
          inactive: isInactive,
        }"
      >
        {{ title }}
        <b class="rk-text rk-text--count">
          <span v-if="count && count > 0"> ({{ count }}) </span>
          <Spinner v-else-if="loading" />
          <span v-else-if="count === 0 && value.includes(term)">(0)</span>
          <span v-else-if="activeSection && count === 0">(+)</span>
          <span v-else>(0)</span>
        </b>
      </label>
    </div>
    <slot></slot>
  </li>
</template>

<style lang="scss"></style>
