<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  // defineProps<{
  //   chartData: {
  //     labels: ["January", "February", "March"];
  //     datasets: [{ data: [40, 20, 12] }];
  //   };
  //   chartOptions: {
  //     responsive: true;
  //   };
  // }>();

  const chartData = {
    labels: ['January', 'February', 'March'],
    datasets: [{ data: [40, 20, 12] }],
  };
  const chartOptions = {
    responsive: true,
  };

  // export default {
  //   name: "BarChart",
  //   components: { Bar },
  //   data() {
  //     return {
  //       chartData: {
  //         labels: ["January", "February", "March"],
  //         datasets: [{ data: [40, 20, 12] }],
  //       },
  //       chartOptions: {
  //         responsive: true,
  //       },
  //     };
  //   },
  // };
</script>
