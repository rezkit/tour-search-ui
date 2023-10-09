<script setup lang="ts">
import { ref, toRef, computed } from 'vue'
// Properties and events.
//
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  loading?: boolean
  readonly?: boolean
  disabled?: boolean
  modelValue: any
  selectMessage?: string
  customOptions?: boolean
  groupLabel?: string
}>()
// Main variables.
//
const loading = toRef(props, 'loading')
const disabled = toRef(props, 'disabled')
const readonly = toRef(props, 'readonly')
const selectMessage = toRef(props, 'selectMessage')
const customOptions = toRef(props, 'customOptions')
const groupLabel = toRef(props, 'groupLabel')
// Default state.
//
const isReadonly = readonly.value ? ref(true) : ref(false)
const isDisabled = disabled.value ? ref(true) : ref(false)
const setMessage = selectMessage.value
  ? ref(selectMessage.value)
  : ref('Please Select')
// Model.
//
const value = computed({
  get(): any {
    const defaultVal = props.modelValue || 'default-option'
    return loading.value ? 'loading-options' : defaultVal
  },

  set(value: any) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <div class="rkts-sort-by">
    <select
      v-model="value"
      :readonly="isReadonly"
      :disabled="isDisabled"
      class="rkts-sort-by__drop-down rk-select"
    >
      <option v-if="loading" disabled value="loading-options">
        Loading...
      </option>
      <option v-else disabled value="default-option">
        {{ setMessage }}
      </option>
      <optgroup v-if="customOptions" :label="groupLabel ? `${groupLabel}:` : `Options:`">
        <slot></slot>
      </optgroup>
      <optgroup v-else :label="groupLabel ? `${groupLabel}:` : `Options:`">
        <option value="BEST_SELLER">
          Best Seller
        </option>
        <option value="PRICE_ASC">
          Price (Ascending)
        </option>
        <option value="PRICE_DESC">
          Price (Descending)
        </option>
        <option value="DEPARTURES_ASC">
          Departures (Soonest First)
        </option>
      </optgroup>
    </select>
  </div>
</template>

<style lang="scss"></style>
