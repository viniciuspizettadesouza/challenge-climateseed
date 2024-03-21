<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '../stores/data';

const dataStore = useDataStore();
const { organisations, chartOptions } = storeToRefs(dataStore);

const orgNumberOfEmployesSeries = computed(() => {
  return [
    {
      name: 'NumberOfEmployees',
      data: organisations.value.map((org) => org.numberOfEmployees),
    },
  ];
});
</script>

<template>
  <div class="max-w-md mx-auto p-6 space-y-8 bg-white rounded-lg shadow-lg">
    <h2 class="text-lg font-semibold mb-4 text-green-600">
      Organizations Number Of Employees
    </h2>
    <apexchart
      :series="orgNumberOfEmployesSeries"
      :options="chartOptions"
      type="bar"
      class="w-full"
    />
  </div>
</template>
