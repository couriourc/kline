<script setup lang="ts">
import {navigateTo} from "#app";
import {useLocalePath} from "#i18n";

const localePath = useLocalePath();

await navigateTo(localePath("/kline"));

</script>

<template>
</template>

<style scoped>

</style>
