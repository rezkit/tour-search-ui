<script setup lang="ts">
import { ref } from "vue";
import Slider from '@vueform/slider'
// Main variables.
//
const value = ref(50)
</script>

<template>
  <div class="rkts-range-slider">
    <Slider v-model="value" />
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>
