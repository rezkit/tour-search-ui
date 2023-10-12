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
}>()
// Main variables.
//
const styleOpts = toRef(props, 'styleOpts')
const typeOf = toRef(props, 'typeOf')
// Model.
//
const value = computed({
  get(): number | null {
    return typeOf.value === 'string'
      ? parseFloat(props.modelValue)
      : props.modelValue
  },

  set(value: number | null) {
    emit('update:modelValue', value || null)
  },
})
</script>

<template>
  <div class="rkts-range-slider">
    <Slider v-model="value" :class="[styleOpts]" />
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>
