<script setup lang="ts">
import { useDataStore } from '../stores/data';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const dataStore = useDataStore();
const { aggregatedData, aggregatedDataTypeBar, chartOptions } = storeToRefs(dataStore);
let { series } = aggregatedData.value;

const isDonutChart = ref(true);

const toggleChartType = () => {
  isDonutChart.value = !isDonutChart.value;
};
</script>

<template>
  <div>
    <button @click="toggleChartType">Toggle Chart Type</button>
    <div v-if="isDonutChart">
      <apexchart :series="series" :options="chartOptions" type="donut" />
    </div>
    <div v-else>
      <apexchart :series="aggregatedDataTypeBar" :options="chartOptions" type="bar" />
    </div>
  </div>
</template>
