<script setup lang="ts">
import { ref, toRef, computed } from 'vue'
// Components.
//
import ListCheckbox from '@/components/elements/ListCheckbox.vue'
// Properties and events.
//
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: any
  styleOpts?: string
  title: string
  text: string
  count?: number
  prefix: string
  term: string
}>()
// Main variables.
//
const term = toRef(props, 'term')
const prefix = toRef(props, 'prefix')
const styleOpts = toRef(props, 'styleOpts')
const count = props.count ? toRef(props, 'count') : ref(0)
const title = toRef(props, 'title')
const text = toRef(props, 'text')
// Model.
//
const value = computed({
  get(): any {
    return props.modelValue || []
  },

  set(value: any) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <div class="rkts-descriptive-list" :class="[styleOpts]">
    <div class="rkts-descriptive-list__title">
      <ul class="rk-list rk-list--no-type">
        <ListCheckbox
          v-model="value"
          :title="title"
          :count="count"
          :term="term"
          :prefix="prefix"
        ></ListCheckbox>
      </ul>
    </div>
    <div class="rkts-descriptive-list__text">
      {{ text }}
      <hr class="rkts-descriptive-list__line-break" />
    </div>
  </div>
</template>

<style lang="scss"></style>
