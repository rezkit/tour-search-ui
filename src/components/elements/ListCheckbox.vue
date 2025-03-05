<script setup lang="ts">
import { toRef, computed, ref } from 'vue'
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
const count = props.count ? toRef(props, 'count') : ref(0)
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
  <li class="rkts-list-checkbox" :class="{ 'hide-option': count === 0 }">
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
        <b v-if="count && count > 0" class="rk-text rk-text--count">
          ({{ count }})
        </b>
      </label>
    </div>
    <slot></slot>
  </li>
</template>

<style lang="scss"></style>
