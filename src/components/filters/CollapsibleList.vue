<script setup lang="ts">
import { ref, toRef, computed } from 'vue'
// Components.
//
import ListCheckbox from '@/components/elements/ListCheckbox.vue'
// Properties and events.
//
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: boolean
  styleOpts?: string
  title: string
  open: boolean
}>()
// Main variables.
//
const styleOpts = toRef(props, 'styleOpts')
const title = toRef(props, 'title')
const open = toRef(props, 'open')
const collapsibleGroup = ref()
const collapsibleTitle = ref()
const collapsibleContent = ref()
// Model.
//
const value = computed({
  get(): any {
    return props.modelValue || false
  },

  set(value: any) {
    emit('update:modelValue', value)
  },
})
// Functions.
//
const toggle = function toggle() {
  const group = collapsibleGroup.value as HTMLElement
  const title = collapsibleTitle.value as HTMLElement
  const content = collapsibleContent.value as HTMLElement
  if (!group.classList.contains('open')) {
    group.classList.add('open')
    title.classList.add('open')
    content.classList.add('open')
  } else {
    group.classList.remove('open')
    title.classList.remove('open')
    content.classList.remove('open')
  }
}
</script>

<template>
  <div
    ref="collapsibleGroup"
    class="rkts-collapsible-list"
    :class="[styleOpts, { open: open }]"
  >
    <div
      ref="collapsibleTitle"
      class="rkts-collapsible-list__title"
      :class="{ open: open }"
      @click="toggle"
    >
      <ul class="rk-list rk-list--no-type">
        <ListCheckbox v-model="value" :title="title" :count="20"></ListCheckbox>
      </ul>
    </div>
    <div
      ref="collapsibleContent"
      class="rkts-collapsible-list__content"
      :class="{ open: open }"
    >
      <ul class="rk-list rk-list--no-type">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<style lang="scss"></style>
