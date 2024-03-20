<script setup lang="ts">
import { useDataStore } from '../stores/data';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const dataStore = useDataStore();
const { aggregatedData, aggregatedDataTypeBar, chartOptions } =
  storeToRefs(dataStore);
const { series } = aggregatedData.value;

const isDonutChart = ref(true);
const newData = ref({ categoryId: null, entityId: null, kco2e: null });

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
    newData.value = { categoryId: null, entityId: null, kco2e: null };
  } else {
    alert('Please fill all fields');
  }
};

const { organisations, categories } = dataStore;
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-8">
    <div>
      <button
        @click="toggleChartType"
        class="bg-green-600 hover:bg-green-500 text-white rounded-md px-4 py-2"
      >
        Toggle Chart Type
      </button>
    </div>

    <div v-if="isDonutChart">
      <apexchart
        :series="series"
        :options="chartOptions"
        type="donut"
        class="w-full"
      />
    </div>
    <div v-else>
      <apexchart
        :series="aggregatedDataTypeBar"
        :options="chartOptions"
        type="bar"
        class="w-full"
      />
    </div>

    <form @submit.prevent="addData" class="flex flex-col space-y-4">
      <div class="flex flex-col sm:flex-row sm:space-x-4">
        <div class="w-full sm:w-1/2">
          <label for="category" class="block font-semibold mb-1"
            >Category:</label
          >
          <select
            v-model="newData.categoryId"
            id="category"
            class="border rounded-md p-2 w-full"
          >
            <option disabled value="">Select Category</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="w-full sm:w-1/2">
          <label for="organisation" class="block font-semibold mb-1"
            >Organisation:</label
          >
          <select
            v-model="newData.entityId"
            id="organisation"
            class="border rounded-md p-2 w-full"
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
          type="number"
          v-model="newData.kco2e"
          id="kco2e"
          placeholder="Enter Kco2e"
          class="border rounded-md p-2 w-full"
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
