<template>
    <input type="search" class="rkts.SearchBox-input" v-model="value" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: String
    }
})
const emit = defineEmits(['update:model-value'])

const value = computed({
    get(): string {
        return props.modelValue   
    },

    set(value: string) {
        emit('update:model-value', value)
    }
})
</script>
