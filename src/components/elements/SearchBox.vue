<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { Client, SEARCH_CLIENT } from '@/main'
// eslint-disable-next-line vue/no-dupe-keys
import debounce from 'lodash-es/debounce'
// Properties and events.
//
const emit = defineEmits(['update:model-value'])
const props = defineProps({
  modelValue: {
    type: String,
  },

  placeholder: {
    type: String,
    required: false,
    default: 'Enter keyword',
  },

  enableSuggestions: {
    type: Boolean,
    required: false,
    default: true,
  },

  debounce: {
    type: Number,
    required: false,
    default: 200,
  },
})
// Main variables.
//
const client = inject<Client>(SEARCH_CLIENT)
const suggestions = ref()
// Model.
//
const value = computed({
  get(): string {
    return props.modelValue || ''
  },

  set(value: string) {
    emit('update:model-value', value)
  },
})
// Functions.
//
debounce(async () => {
  suggestions.value = await client?.suggest({
    ccy: 'GBP',
    q: value.value || '',
  })
}, props.debounce)
</script>

<template>
  <div class="rkts-search-box">
    <input
      v-model="value"
      type="search"
      class="rk-input rk-input--search-box"
      :placeholder="placeholder"
    />
    <div class="rkts-search-box__suggestions">
      <ul class="rk-list" v-if="enableSuggestions"></ul>
    </div>
  </div>
</template>

<style lang="scss"></style>
