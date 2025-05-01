<script setup lang="ts">
import { toRef, computed } from 'vue'
import Slider from '@vueform/slider'
// Properties and events.
//
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: any | null
  styleOpts?: string
  typeOf?: any
  min?: number
  max?: number
  step?: number
  format?: object
}>()
// Main variables.
//
const styleOpts = toRef(props, 'styleOpts')
const typeOf = toRef(props, 'typeOf')
const format = toRef(props, 'format')
const step = toRef(props, 'step')
const min = toRef(props, 'min')
const max = toRef(props, 'max')
// Model.
//
const value = computed({
  get(): any | null {
    return typeSwitch(typeOf.value)
  },

  set(value: any | null) {
    emit('update:modelValue', value || null)
  },
})
// Functions.
//
const typeSwitch = function typeSwitch(typeOf: string) {
  let model = null
  switch (typeOf) {
    case 'string':
      model = parseFloat(props.modelValue)
      break
    default:
      model = props.modelValue
      break
  }
  return model
}
</script>

<template>
  <div class="rkts-range-slider">
    <Slider
      v-model="value"
      :class="[styleOpts]"
      :min="min || 0"
      :max="max || 1000"
      :step="step || 10"
      :format="format || {}"
    />
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>
