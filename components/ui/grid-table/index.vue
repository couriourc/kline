<script setup lang="ts">
import {ref} from "vue";
import {postStockMarketKline} from "~/services/stock/market";
import type {Column} from "ag-grid-community";

const showLoading = ref(false);

let total = 100;

const $fetcher = postStockMarketKline();
defineProps<{
  data: []
  columns: Column[]
}>();
console.log($fetcher);
</script>

<template>
  <d-table :data="data"
           table-height="98vh"

  >

    <d-column v-for="column in columns" v-bind="column" :key="column.field" fix-header >

    </d-column>
  </d-table>
</template>
