<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { Client, SEARCH_CLIENT } from '../main';
import debounce from 'lodash-es/debounce'
// Properties and events.
//
const emit = defineEmits(['update:model-value'])
const props = defineProps({
  modelValue: {
    type: String
  },

  enableSuggestions: {
    type: Boolean,
    required: false,
    default: true,
  },

  debounce: {
    type: Number,
    required: false,
    default: 200
  }
})

// Main variables.
//
const client = inject<Client>(SEARCH_CLIENT)
const suggestions = ref()

const value = computed({
  get(): string {
    return props.modelValue || ''
  },

  set(value: string) {
    emit('update:model-value', value)
  }
})
// Functions.
//
debounce(async () => {
  suggestions.value = await client?.suggest({ ccy: 'GBP', q: value || '' })
}, props.debounce)

</script>

<template>
    <div class="rkts-search-box">
        <input type="search" class="rk-input rk-input--search-box" v-model="value" />
        <div class="rkts-search-box__suggestions">
          <ul class="rk-list" v-if="enableSuggestions"></ul>
        </div>
    </div>
</template>

<style lang="scss"></style>
