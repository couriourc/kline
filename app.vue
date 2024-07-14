<script setup lang="tsx">
import {NConfigProvider} from "naive-ui";

const config = useRuntimeConfig();

</script>
<template>
  <NuxtRouteAnnouncer/>
  <NuxtLayout>
    <ConfigProvider>
      <NConfigProvider>
        <NuxtPage></NuxtPage>
      </NConfigProvider>
    </ConfigProvider>
  </NuxtLayout>
</template>
