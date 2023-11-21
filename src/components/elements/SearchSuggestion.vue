<script setup lang="ts">
import { toRef } from 'vue'
// Properties and events.
//
const emit = defineEmits(['process:chosen-suggestion'])
const props = defineProps<{
  type: string
  title: string
  suggestions: object
}>()
// Main variables.
//
const type = toRef(props, 'type')
const title = toRef(props, 'title')
const suggestions: any = toRef(props, 'suggestions')
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
</script>

<template>
  <ul
    v-if="
      suggestions &&
      suggestions[type][0].options &&
      suggestions[type][0].options.length > 0
    "
    class="rk-list rk-list--no-type rk-list--suggestion"
  >
    <li class="title">
      <p class="rk-text rk-text--lead">{{ title }}:</p>
    </li>
    <template
      v-for="(suggestion, i) in suggestions[type][0].options"
      :key="`${type}-suggestion-${i}}`"
    >
      <li @click="chosenSuggestion(suggestion.text, type)">
        <span class="suggestion-label">
          {{ suggestion.text }}
        </span>
      </li>
    </template>
  </ul>
</template>

<style lang="scss"></style>
