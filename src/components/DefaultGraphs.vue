<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '../stores/data';

const dataStore = useDataStore();
const { aggregatedData, chartOptions } = storeToRefs(dataStore);

const isDonutChart = ref(true);
const toggleChartType = () => {
  isDonutChart.value = !isDonutChart.value;
};

const chartSeries = computed(() => {
  return [{ data: aggregatedData.value.series }];
});
</script>

<template>
  <div v-if="isDonutChart">
    <apexchart
      :series="aggregatedData.series"
      :options="chartOptions"
      type="donut"
      class="w-full"
    />
  </div>
  <div v-else>
    <apexchart
      :series="chartSeries"
      :options="chartOptions"
      type="bar"
      class="w-full"
    />
  </div>

  <div>
    <button
      @click="toggleChartType"
      class="bg-green-600 hover:bg-green-500 text-white rounded-md px-4 py-2"
    >
      Toggle Chart Type
    </button>
  </div>
</template>
