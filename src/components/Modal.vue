<script lang="ts" setup>
import { ref, watch } from "vue";
const props = defineProps<{
    modelValue: boolean;
}>();
const emit = defineEmits<{
    "update:modelValue": [val: boolean];
    onClose: []
}>();
const visibilidade = ref(false);
watch(
    () => props.modelValue,
    (val) => {
        visibilidade.value = props.modelValue;
        val
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "inherit");
    },
    { immediate: true }
);
watch(() => visibilidade.value, () => {
    if (!visibilidade.value)
        emit('onClose');
})
function fechar() {
    emit("update:modelValue", false);
    visibilidade.value = false;
}
</script>

<template>
    <div class="topah-dialog" :class="visibilidade ? 'aberta' : 'fechada'" @click="fechar">
        <div class="topah-dialog-base" @click.stop>
            <div class="topah-card">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style>

.topah-dialog {
	 width: 100vw;
	 height: 100vh;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 position: fixed;
	 left: 0;
	 top: 0;
	 opacity: 0;
	 transition: all 0.3s ease;
	 overflow: hidden;
	 z-index: -50;
}
 .topah-dialog.aberta {
	 opacity: 1;
	 backdrop-filter: brightness(0.2);
	 z-index: 50;
}
 .topah-dialog.aberta .topah-dialog-base {
	 transform: translate(0px, 0vh);
	 opacity: 1;
}
 .topah-dialog .topah-dialog-base {
	 transition: all 0.3s ease;
	 transform: translate(0px, 150vh);
	 opacity: 0;
	 display: flex;
	 flex-direction: column;
	 flex-wrap: wrap;
}
 .topah-dialog .topah-card {
	 background-color: var(--color-highlight);
	 border-radius: 10px;
	 padding: 20px;
}
 @media (max-width: 768px) {
	 .topah-dialog-base {
		 width: 100%;
		 height: 100%;
	}
	 .topah-dialog-base .topah-card {
		 height: 100%;
		 display: flex;
		 align-items: center;
		 flex-direction: column;
	}
}
 
</style>
