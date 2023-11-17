<script setup lang="ts">
import { toRef, ref } from 'vue'
import VPagination from '@hennge/vue3-pagination'
// Properties and events.
//
const emit = defineEmits(['update'])
const props = defineProps<{
  pages: any
  styleOpts?: string
  activeColour: string
}>()
// Main variables.
//
const activeColour = toRef(props, 'activeColour')
const styleOpts = toRef(props, 'styleOpts')
const pages = toRef(props, 'pages')
const model = ref(1)
// Functions.
//
function updateHandler() {
  emit('update', model.value)
}
</script>
<template>
  <div class="rkts-list-pagination" :class="[styleOpts]">
    <VPagination
      v-model="model"
      :pages="pages"
      :range-size="1"
      :active-color="activeColour"
      @update:modelValue="updateHandler"
    />
  </div>
</template>

<style src="@hennge/vue3-pagination/dist/vue3-pagination.css"></style>
