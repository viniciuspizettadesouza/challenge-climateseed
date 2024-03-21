<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '../stores/data';

const dataStore = useDataStore();
const { uniqueCategories, organisations } = storeToRefs(dataStore);
const newData = ref({ entityId: null, categoryId: null, kco2e: null });

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
</script>

<template>
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
</template>
