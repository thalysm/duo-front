<script setup lang="ts">
import { ref, watch } from 'vue';

const rating = ref<number|null>(0);

const setRating = (value: number) => {
    rating.value = value;
};

const props = withDefaults(
    defineProps<{
        modelValue: number|null;
    }>(), {
        modelValue: 0
    }
);
const emits = defineEmits<{
    (e: "update:modelValue", value: number|null): void;
}>();
watch(
    () => props.modelValue,
    (value) => {
        rating.value = value;
    },
    {
        immediate: true,
    }
);
watch(
    () => rating.value,
    (value) => {
        emits("update:modelValue", value);
    }
);
</script>

<template>
<div class="rating-container">
    <div @click="setRating(i)" v-for="i in 10" :key="i" class="rating" :class="{ checked: rating === i }">
        <input type="radio" :id="'star' + i" name="rating" :value="i" v-model="rating"  />
        <label :for="'star' + i">{{ i }}</label>
    </div>
</div>
</template>

<style scoped>
.rating-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
label {
    font-size: 20px;
    font-weight: 400;
    color: #ffffff;
    cursor: pointer;
}
input[type="radio"] {
    display: none;
}
.rating {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border: 1px solid var(--color-background);
    border-radius: 8px;
    cursor: pointer;
}
.rating:hover {
    border: 1px solid var(--color-primary);
}
.rating.checked {
    background-color: var(--color-primary);
}
</style>