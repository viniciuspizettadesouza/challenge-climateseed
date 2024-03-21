<script setup lang="ts">
import Form from '../components/Form.vue';
import DefaultGraphs from '../components/DefaultGraphs.vue';
import NewGraph from '../components/NewGraph.vue';
</script>

<template>
  <div class="max-w-md mx-auto p-6 space-y-8">
    <NewGraph />

    <DefaultGraphs />

    <Form />
  </div>
</template>
