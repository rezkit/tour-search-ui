<script setup lang="ts">
import { toRef } from 'vue'
// Properties and events.
//
const emit = defineEmits(['process:chosen-suggestion', 'process:more-items'])
const props = defineProps<{
  type: string
  title: string
  suggestions: object
  moreCount?: number | null
  moreText?: string | null
}>()
// Main variables.
//
const type = toRef(props, 'type')
const title = toRef(props, 'title')
const suggestions: any = toRef(props, 'suggestions')
const moreCount = toRef(props, 'moreCount')
const moreText = toRef(props, 'moreText')
// Functions.
//
const chosenSuggestion = function chosenSuggestion(
  option: string,
  type: string,
  id: any
) {
  emit('process:chosen-suggestion', {
    option,
    type,
    id,
  })
}

const moreItems = function moreItems() {
  emit('process:more-items')
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
      <li
        v-if="moreCount && i < moreCount"
        @click="chosenSuggestion(suggestion.text, type, suggestion._id || null)"
      >
        <span class="suggestion-label">
          {{ suggestion.text }}
        </span>
      </li>
      <li
        v-else-if="!moreCount && !moreText"
        @click="chosenSuggestion(suggestion.text, type, suggestion._id || null)"
      >
        <span class="suggestion-label">
          {{ suggestion.text }}
        </span>
      </li>
      <li v-if="i === moreCount && moreText" @click="moreItems">
        <span class="suggestion-label">
          {{ moreText }}
        </span>
      </li>
    </template>
  </ul>
</template>

<style lang="scss"></style>
