<template>
  <d-table :data="dataSource" table-height="200px" :show-loading="showLoading" :lazy="true" @load-more="loadMore">
    <d-column field="firstName" header="First Name"></d-column>
    <d-column field="lastName" header="Last Name"></d-column>
    <d-column field="gender" header="Gender"></d-column>
    <d-column field="date" header="Date of birth"></d-column>
  </d-table>
</template>

<script setup lang="ts">
const showLoading = ref(false);
const dataSource = ref([
  {
    firstName: 'diy0',
    lastName: 'Otto',
    date: '1990/01/11',
    gender: 'Male',
  },
  {
    firstName: 'diy1',
    lastName: 'Otto',
    date: '1990/01/11',
    gender: 'Male',
  },
  {
    firstName: 'diy2',
    lastName: 'Thornton',
    gender: 'Female',
    date: '1990/01/12',
  },
  {
    firstName: 'diy3',
    lastName: 'Chen',
    gender: 'Male',
    date: '1990/01/13',
  },
  {
    firstName: 'diy4',
    lastName: 'gerong',
    gender: 'Male',
    date: '1990/01/14',
  },
  {
    firstName: 'diy5',
    lastName: 'lang',
    gender: 'Male',
    date: '1990/01/14',
  },
  {
    firstName: 'diy6',
    lastName: 'li',
    gender: 'Male',
    date: '1990/01/14',
  },
  {
    firstName: 'diy7',
    lastName: 'li',
    gender: 'Female',
    date: '1990/01/14',
  },
  {
    firstName: 'diy8',
    lastName: 'Yu',
    gender: 'Female',
    date: '1990/01/14',
  },
  {
    firstName: 'diy9',
    lastName: 'Yu',
    gender: 'Female',
    date: '1990/01/14',
  },
]);

let total = 100;

const loadMore = () => {
  if (dataSource.value.length >= total || showLoading.value) {
    return;
  }

  showLoading.value = true;
  const moreData = [];
  const size = dataSource.value.length;
  for (let i = 0; i < 10; i++) {
    moreData.push({
      firstName: 'diy' + (i + size),
      lastName: 'more data',
      gender: 'Female',
      date: '2022/07/20',
    });
  }

  // mock ajax
  setTimeout(() => {
    showLoading.value = false;
    dataSource.value = dataSource.value.concat(moreData);
  }, 500);
};
</script>
