<script setup lang="ts">
import { useDataStore } from '../stores/data';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { computed } from 'vue';

const dataStore = useDataStore();
const { aggregatedData, chartOptions, uniqueCategories, organisations } =
  storeToRefs(dataStore);

const isDonutChart = ref(true);
const newData = ref({ entityId: null, categoryId: null, kco2e: null });

const toggleChartType = () => {
  isDonutChart.value = !isDonutChart.value;
};

const addData = () => {
  if (
    newData.value.categoryId &&
    newData.value.entityId &&
    newData.value.kco2e
  ) {
    dataStore.addData(newData.value);
    newData.value = { entityId: null, categoryId: null, kco2e: null };
  }
};

const chartSeries = computed(() => {
  return [{ data: aggregatedData.value.series }];
});

// New graph: Turnover of each organization
const orgNumberOfEmployesSeries = computed(() => {
  return [
    {
      name: 'NumberOfEmployees',
      data: organisations.value.map((org) => org.numberOfEmployees),
    },
  ];
});

const orgNumberOfEmployesOptions = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: '100%',
      width: '100%',
    },
    xaxis: {
      categories: organisations.value.map((org) => org.name),
    },
    colors: ['#4B77BE'],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    grid: {
      borderColor: '#f1f1f1',
    },
  };
});
</script>

<template>
  <div class="max-w-md mx-auto p-6 space-y-8">
    <div class="max-w-md mx-auto p-6 space-y-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-lg font-semibold mb-4">
        Organizations Number Of Employees
      </h2>
      <apexchart
        :series="orgNumberOfEmployesSeries"
        :options="orgNumberOfEmployesOptions"
        type="bar"
        class="w-full"
      />
    </div>

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

    <form @submit.prevent="addData" class="flex flex-col space-y-4">
      <div class="flex flex-col sm:flex-row sm:space-x-4">
        <div class="w-full sm:w-1/2">
          <label for="category" class="block font-semibold mb-1">
            Category:
          </label>
          <select
            v-model="newData.categoryId"
            id="category"
            class="border rounded-md p-2 w-full text-black"
          >
            <option disabled value="">Select Category</option>

            <option
              v-for="category in uniqueCategories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
        <div class="w-full sm:w-1/2">
          <label for="organisation" class="block font-semibold mb-1">
            Organisation:
          </label>
          <select
            v-model="newData.entityId"
            id="organisation"
            class="border rounded-md p-2 w-full text-black"
          >
            <option disabled value="">Select Organisation</option>
            <option
              v-for="organisation in organisations"
              :key="organisation.id"
              :value="organisation.id"
            >
              {{ organisation.name }}
            </option>
          </select>
        </div>
      </div>

      <div>
        <label for="kco2e" class="block font-semibold mb-1">Kco2e:</label>
        <input
          v-model.number="newData.kco2e"
          type="number"
          id="kco2e"
          class="border rounded-md p-2 w-full text-black"
        />
      </div>

      <button
        type="submit"
        class="bg-green-600 hover:bg-green-500 text-white rounded-md px-4 py-2"
      >
        Add Data
      </button>
    </form>
  </div>
</template>
