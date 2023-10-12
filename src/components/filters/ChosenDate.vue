<script setup lang="ts">
import { toRef, computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
// Properties and events.
//
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: any | null
  styleOpts?: string
  type?: string
}>()
// Main variables.
//
const styleOpts = toRef(props, 'styleOpts')
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
      format="dd MMM yyyy"
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
