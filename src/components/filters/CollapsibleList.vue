<script setup lang="ts">
import { ref, toRef, computed } from 'vue'
import { flatMap } from 'lodash-es'
// Components.
//
import ListCheckbox from '@/components/elements/ListCheckbox.vue'
import ListContainer from '@/components/elements/ListContainer.vue'
// Properties and events.
//
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue?: any
  subOptions: any
  styleOpts?: string
  count?: number
  title: string
  open: boolean
  prefix?: string
  term?: string
  headingOnly?: boolean
}>()
// Main variables.
//
const headingOnly = toRef(props, 'headingOnly')
const term = toRef(props, 'term')
const prefix = toRef(props, 'prefix')
const styleOpts = toRef(props, 'styleOpts')
const subOptions = toRef(props, 'subOptions')
const count = toRef(props, 'count')
const title = toRef(props, 'title')
const open = toRef(props, 'open')
const collapsibleGroup = ref()
const collapsibleTitle = ref()
const collapsibleContent = ref()
const children = ref(flatMap(subOptions.value))
const hasChildren = computed(() => children.value && children.value.length > 0)
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
// Functions.
//
const toggle = function toggle() {
  if (hasChildren.value) {
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
}
</script>

<template>
  <div
    ref="collapsibleGroup"
    class="rkts-collapsible-list"
    :class="[styleOpts, { open: open && hasChildren }]"
  >
    <div
      ref="collapsibleTitle"
      class="rkts-collapsible-list__title"
      :class="{ open: open && hasChildren, 'drop-down': hasChildren }"
      @click="toggle"
    >
      <label v-if="headingOnly">
        {{ title }}
      </label>
      <ListContainer v-else>
        <ListCheckbox
          v-model="value"
          :title="title"
          :prefix="prefix || ''"
          :term="term || ''"
          :count="count"
        ></ListCheckbox>
      </ListContainer>
    </div>
    <div
      v-if="hasChildren"
      ref="collapsibleContent"
      class="rkts-collapsible-list__content"
      :class="{ open: open }"
    >
      <ListContainer>
        <slot></slot>
      </ListContainer>
    </div>
  </div>
</template>

<style lang="scss"></style>
