<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { Client, SEARCH_CLIENT } from '@/main'
// eslint-disable-next-line vue/no-dupe-keys
import debounce from 'lodash-es/debounce'
// Properties and events.
//
const emit = defineEmits(['update:model-value', 'process:chosen-suggestion'])
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
const suggestions: any = ref(null)
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
const chosenSuggestion = function chosenSuggestion(
  option: string,
  type: string
) {
  emit('process:chosen-suggestion', {
    option,
    type,
  })
}

watch(
  value,
  debounce(async () => {
    if (props.enableSuggestions && value.value.length > 0) {
      const resp = await client?.suggest({
        ccy: 'GBP',
        q: value.value || '',
      })
      if (resp) {
        suggestions.value = resp
      }
    } else {
      suggestions.value = null
    }
  }, props.debounce)
)
</script>

<template>
  <div class="rkts-search-box">
    <input
      v-model="value"
      type="search"
      class="rk-input rk-input--search-box"
      :placeholder="placeholder"
    />
    <div
      v-if="enableSuggestions"
      class="rkts-search-box__suggestions"
      :class="{ show: suggestions }"
    >
      <ul
        v-if="
          suggestions &&
          suggestions['category'][0].options &&
          suggestions['category'][0].options.length > 0
        "
        class="rk-list rk-list--no-type rk-list--suggestion"
      >
        <li>
          <p class="rk-text rk-text--lead">Categories:</p>
        </li>
        <template
          v-for="(category, i) in suggestions['category'][0].options"
          :key="`category-suggestion-${i}}`"
        >
          <li @click="chosenSuggestion(category.text, 'category')">
            {{ category.text }}
          </li>
        </template>
      </ul>
      <ul
        v-if="
          suggestions &&
          suggestions['location'][0].options &&
          suggestions['location'][0].options.length > 0
        "
        class="rk-list rk-list--no-type rk-list--suggestion"
      >
        <li>
          <p class="rk-text rk-text--lead">Locations:</p>
        </li>
        <template
          v-for="(location, i) in suggestions['location'][0].options"
          :key="`location-suggestion-${i}}`"
        >
          <li @click="chosenSuggestion(location.text, 'location')">
            {{ location.text }}
          </li>
        </template>
      </ul>
      <ul
        v-if="
          suggestions &&
          suggestions['name'][0].options &&
          suggestions['name'][0].options.length > 0
        "
        class="rk-list rk-list--no-type rk-list--suggestion"
      >
        <li>
          <p class="rk-text rk-text--lead">Tour Names:</p>
        </li>
        <template
          v-for="(name, i) in suggestions['name'][0].options"
          :key="`name-suggestion-${i}}`"
        >
          <li @click="chosenSuggestion(name.text, 'name')">
            {{ name.text }}
          </li>
        </template>
      </ul>
      <ul
        v-if="
          suggestions &&
          suggestions['x_code'][0].options &&
          suggestions['x_code'][0].options.length > 0
        "
        class="rk-list rk-list--no-type rk-list--suggestion"
      >
        <li>
          <p class="rk-text rk-text--lead">Tour Codes:</p>
        </li>
        <template
          v-for="(xcode, i) in suggestions['x_code'][0].options"
          :key="`xcode-suggestion-${i}}`"
        >
          <li @click="chosenSuggestion(xcode.text, 'x_code')">
            {{ xcode.text }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style lang="scss"></style>
