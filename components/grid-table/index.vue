<template>
  <ag-grid-vue
      :rowData="rowData"
      :columnDefs="colDefs"
      v-bind="$attrs"
      class="ag-theme-quartz"
  />
</template>

<script setup>
import {AgGridVue} from 'ag-grid-vue3'; // Vue Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid
const rowData = ref([
  {make: 'Tesla', model: 'Model Y', price: 64950, electric: true},
  {make: 'Ford', model: 'F-Series', price: 33850, electric: false},
  {make: 'Toyota', model: 'Corolla', price: 29600, electric: false},
]);

// Column Definitions: Defines the columns to be displayed.
const colDefs = ref([
  {field: 'make'},
  {field: 'model'},
  {field: 'price'},
  {field: 'electric'},
]);

</script>
