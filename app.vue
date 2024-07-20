<script setup lang="tsx">
import {NConfigProvider} from "naive-ui";

const config = useRuntimeConfig();

</script>
<template>
  <NuxtRouteAnnouncer/>
  <NuxtLayout>
    <NConfigProvider>
      <NuxtPage></NuxtPage>
    </NConfigProvider>
  </NuxtLayout>
</template>
