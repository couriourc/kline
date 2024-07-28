<script setup lang="ts">
import {useKlineChartStore} from "~/stores/klineStore";

const store = useKlineChartStore();
</script>
<template>
  <NuxtLoadingIndicator/>
  <d-layout class="bg-black/5 ">
    <d-layout>
      <d-aside
          class=" w-fit flex-shrink-0 bg-white rounded-12px max-h-screen overflow-y-auto overflow-x-hidden scrollbar-none">
        <ui-menu-items @select-aside="store.handleSelectAside" :links="store.asides"></ui-menu-items>
      </d-aside>
      <d-content class="h-full w-full pl-6px  box-border">
        <RouterView></RouterView>
      </d-content>
    </d-layout>
  </d-layout>
</template>
