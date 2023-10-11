<script setup lang="ts">
import { toRef, computed } from 'vue'
// Properties and events.
//
const emit = defineEmits(['update:modelValue', 'process:clearFilters'])
const props = defineProps<{
  modelValue: boolean
  styleOpts?: string
  title: string,
}>()
// Main variables.
//
const styleOpts = toRef(props, 'styleOpts')
const title = toRef(props, 'title')
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
  <div class="rkts-collapsible-list" :class="[styleOpts]">
    <div class="rkts-collapsible-list__title">
      <input v-model="value" class="rk-input rk-input--checkbox" type="checkbox" />
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
