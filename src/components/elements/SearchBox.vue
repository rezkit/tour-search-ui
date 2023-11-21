<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { Client, SEARCH_CLIENT } from '@/main'
// eslint-disable-next-line vue/no-dupe-keys
import debounce from 'lodash-es/debounce'
// Components.
//
import SearchSuggestion from '@/components/elements/SearchSuggestion.vue'
// Properties and events.
//
const emit = defineEmits([
  'update:model-value',
  'process:chosen-suggestion',
  'process:keyup',
])
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

  layout: {
    type: String,
    required: false,
    default: 'default',
  },
})
// Main variables.
//
const layout = props.layout ? ref(props.layout) : ref('default')
const client = inject<Client>(SEARCH_CLIENT)
const suggestions: any = ref(null)
const visible = ref(false)
const searchInput = ref()
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
const chosenSuggestion = function chosenSuggestion(suggestion: any) {
  emit('process:chosen-suggestion', suggestion)
}

const fieldKeyup = function fieldKeyup() {
  emit('process:keyup', value.value)
}

const hideSuggestions = function hideSuggestions() {
  setTimeout(() => {
    visible.value = false
  }, 500)
}

const showSuggestions = function hideSuggestions() {
  visible.value = true
}

watch(
  value,
  debounce(async () => {
    if (props.enableSuggestions && value.value.length > 0) {
      showSuggestions()
      const resp = await client?.suggest({
        ccy: 'GBP',
        q: value.value || '',
      })
      if (resp) {
        suggestions.value = resp
      }
    } else {
      hideSuggestions()
      suggestions.value = null
    }
  }, props.debounce)
)
</script>

<template>
  <div class="rkts-search-box" :class="`rkts-search-box--${layout}`">
    <input
      ref="searchInput"
      v-model="value"
      type="search"
      class="rk-input rk-input--search-box"
      :class="`layout-${layout}`"
      :placeholder="placeholder"
      @focusout="hideSuggestions"
      @keyup.enter="fieldKeyup"
    />
    <button
      v-if="layout === 'primary'"
      class="rkts-search-box__submit"
      @click="fieldKeyup"
    >
      <i class="fontello icon-sys-search-1"></i>
    </button>
    <div
      v-if="enableSuggestions"
      class="rkts-search-box__suggestions"
      :class="{ show: suggestions && visible }"
      @click.stop
    >
      <SearchSuggestion
        title="Categories"
        :suggestions="suggestions"
        type="category"
        @process:chosen-suggestion="chosenSuggestion"
      ></SearchSuggestion>

      <SearchSuggestion
        title="Locations"
        :suggestions="suggestions"
        type="location"
        @process:chosen-suggestion="chosenSuggestion"
      ></SearchSuggestion>

      <SearchSuggestion
        title="Tour Names"
        :suggestions="suggestions"
        type="name"
        @process:chosen-suggestion="chosenSuggestion"
      ></SearchSuggestion>

      <SearchSuggestion
        title="Tour Codes"
        :suggestions="suggestions"
        type="x_code"
        @process:chosen-suggestion="chosenSuggestion"
      ></SearchSuggestion>
    </div>
  </div>
</template>

<style lang="scss"></style>
