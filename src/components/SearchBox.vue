<template>
    <div class="rkts-search-box">
        <input type="search" class="rk-input rk-input--search-box" v-model="value" />
        <ul class="rkts-search-box__suggestions" v-if="enableSuggestions"></ul>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { Client, SEARCH_CLIENT } from '../main';
import debounce from 'lodash-es/debounce'

const props = defineProps({
    modelValue: {
        type: String
    },

    enableSuggestions: {
        type: Boolean,
        required: false,
        default: true,
    },

    debounce: {
        type: Number,
        required: false,
        default: 200
    }
})

const emit = defineEmits(['update:model-value'])
const client = inject<Client>(SEARCH_CLIENT)
const suggestions = ref()

const value = computed({
    get(): string {
        return props.modelValue || ''
    },

    set(value: string) {
        emit('update:model-value', value)
    }
})

debounce(async () => {
    suggestions.value = await client?.suggest({ ccy: 'GBP', q: value || '' })
}, props.debounce)

</script>
