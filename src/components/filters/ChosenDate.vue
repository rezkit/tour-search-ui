<script setup lang="ts">
import { toRef } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
// Properties and events.
//
const props = defineProps<{
  type?: string
  date: any
}>()
// Main variables.
//
const date = toRef(props, 'date')
const type = toRef(props, 'type')
</script>

<template>
  <div class="rkts-chosen-date">
    <VueDatePicker v-if="type === 'Vue'" />
    <input v-else v-model="date" type="date">
  </div>
</template>

<style src="@vuepic/vue-datepicker/dist/main.css"></style>
