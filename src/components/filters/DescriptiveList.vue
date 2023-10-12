<script setup lang="ts">
import { toRef, computed } from 'vue'
// Components.
//
import ListCheckbox from '@/components/elements/ListCheckbox.vue'
// Properties and events.
//
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: boolean
  showCount?: boolean
  styleOpts?: string
  title: string
  text: string
}>()
// Main variables.
//
const styleOpts = toRef(props, 'styleOpts')
const showCount = toRef(props, 'showCount')
const title = toRef(props, 'title')
const text = toRef(props, 'text')
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
  <div class="rkts-description-list" :class="[styleOpts]">
    <div class="rkts-description-list__title">
      <ul class="rk-list rk-list--no-type">
        <ListCheckbox v-model="value" :title="title"></ListCheckbox>
      </ul>
      <span v-if="showCount">(40)</span>
    </div>
    <div class="rkts-description-list__text">
      {{ text }}
      <hr class="rkts-description-list__line-break" />
    </div>
  </div>
</template>

<style lang="scss"></style>
