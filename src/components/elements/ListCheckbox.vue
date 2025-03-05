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
  loading?: boolean
  parent?: string | null
}>()
// Main variables.
//
const term = toRef(props, 'term')
const title = toRef(props, 'title')
const count = toRef(props, 'count')
const prefix = toRef(props, 'prefix')
const loading = toRef(props, 'loading')
const parent = toRef(props, 'parent')
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
        :class="{
          active: value.includes(term),
          inactive: count === 0 && !parent,
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
          inactive: count === 0 && !parent,
        }"
      >
        {{ title }}
        <b class="rk-text rk-text--count">
          <span v-if="loading"></span>
          <span v-else-if="count && count > 0"> ({{ count }}) </span>
          <span v-else-if="count === 0 && !parent"> ({{ count }}) </span>
          <span v-else> (+) </span>
        </b>
      </label>
    </div>
    <slot></slot>
  </li>
</template>

<style lang="scss"></style>
