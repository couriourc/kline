<script setup lang="ts">
import {useKlineChartStore} from "~/stores/klineStore";

const klineStore = useKlineChartStore();
</script>
<template>
  <ul class="flex-col gap-2px p-6px box-border">
    <li v-for="overlay in klineStore.overlays"
        :key="overlay.id"
        class="cursor-pointer rounded-2px border-gray-300 px-4 py-2 bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out"
    >
      <span>{{ overlay.extendData.label }}</span>
      <span>{{ overlay.extendData.enabled ? 'Enabled' : 'Disabled' }}</span>
      <button>Toggle</button>
    </li>
  </ul>
</template>
