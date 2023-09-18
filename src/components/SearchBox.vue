<template>
    <input type="search" class="rk-input rk-input--search-box" v-model="value" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: String
    }
})
const emit = defineEmits(['update:modelValue'])

const value = computed({
    get(): string {
        return props.modelValue
    },

    set(value: string) {
        emit('update:modelValue', value)
    }
})
</script>
