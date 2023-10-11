<script setup lang="ts">
import { toRef, computed } from 'vue'
// Properties and events.
//
const emit = defineEmits(['update:modelValue', 'process:clearFilters'])
const props = defineProps<{
  modelValue: boolean
  showCount?: boolean
  styleOpts?: string
  title: string
  text: string
}>()
// Main variables.
//
const styleOpts = toRef(props, 'styleOpts')
const showCount = toRef(props, 'showCount')
const title = toRef(props, 'title')
const text = toRef(props, 'text')
// Model.
//
const value = computed({
  get(): any {
    return props.modelValue
  },

  set(value: any) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <div class="rkts-description-list" :class="[styleOpts]">
    <div class="rkts-description-list__title">
      <input v-model="value" class="rk-input rk-input--checkbox" type="checkbox" />
      <p class="label m-0">{{ title }}</p>
      <span v-if="showCount">(40)</span>
    </div>
    <div class="rkts-description-list__text">
      {{ text }}
      <hr class="rkts-description-list__line-break" />
    </div>
    <button class="rk-btn rk-btn--clear" type="button" @click="emit('process:clearFilters')">
      <i class="rk-icon rk-icon--primary rk-icon--text-xs fontello icon-sys-close me-2"></i>
      Clear
    </button>
  </div>
</template>

<style lang="scss"></style>
