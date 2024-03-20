<script setup lang="ts">
import { useDataStore } from '../stores/data';
import { storeToRefs } from 'pinia';

const dataStore = useDataStore();
const { aggregatedData, chartOptions } = storeToRefs(dataStore);
const { series, legend } = aggregatedData.value
</script>

<template>
  <div>
    <apexchart :series="series" :options="chartOptions" type="donut" />
    {{ legend }}
    {{ chartOptions }}
  </div>
</template>
