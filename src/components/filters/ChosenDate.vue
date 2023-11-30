<script setup lang="ts">
import { ref, toRef, computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
// Properties and events.
//
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  fieldStartDate?: any
  setFocusStart?: boolean
  placeholderText?: any | null
  modelValue: any | null
  styleOpts?: string
  format?: string
  type?: string
}>()
// Main variables.
//
const placeholderText = toRef(props, 'placeholderText')
const styleOpts = toRef(props, 'styleOpts')
const format = props.format ? toRef(props, 'format') : ref('dd MMM yyyy')
const fieldStartDate = props.fieldStartDate
  ? toRef(props, 'fieldStartDate')
  : ref(null)
const setFocusStart =
  props.setFocusStart && fieldStartDate.value
    ? toRef(props, 'setFocusStart')
    : ref(false)
const type = toRef(props, 'type')
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
  <div class="rkts-chosen-date">
    <VueDatePicker
      v-if="type === 'vue'"
      v-model="value"
      :class="[styleOpts]"
      auto-apply
      :close-on-auto-apply="false"
      :format="format"
      :start-date="fieldStartDate"
      :focus-start-date="setFocusStart"
      :placeholder="placeholderText || null"
    />
    <input
      v-else
      v-model="value"
      class="rk-select rk-select--user-agent"
      :class="[styleOpts]"
      type="date"
    />
  </div>
</template>

<style src="@vuepic/vue-datepicker/dist/main.css"></style>
