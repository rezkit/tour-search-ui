<script setup lang="ts">
import { ref, toRef, computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
// Properties and events.
//
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  allowTimePicker?: boolean
  fieldMinDate?: any
  fieldMaxDate?: any
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
const allowTimePicker = props.allowTimePicker
  ? toRef(props, 'allowTimePicker')
  : ref(false)
const fieldMinDate = props.fieldMinDate
  ? toRef(props, 'fieldMinDate')
  : ref(null)
const fieldMaxDate = props.fieldMaxDate
  ? toRef(props, 'fieldMaxDate')
  : ref(null)
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
// Computed items.
//
const fieldStartDate = computed(() => props.fieldStartDate || null)
const setFocusStart = computed(() =>
  props.setFocusStart && props.fieldStartDate ? props.setFocusStart : false
)
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
      :min-date="fieldMinDate"
      :max-date="fieldMaxDate"
      :start-date="fieldStartDate"
      :focus-start-date="setFocusStart"
      :placeholder="placeholderText || null"
      :enable-time-picker="allowTimePicker"
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
