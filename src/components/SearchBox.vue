<template>
    <input type="search" class="rkts.SearchBox-input" v-model="value" />
</template>

<script setup lang="ts">

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
