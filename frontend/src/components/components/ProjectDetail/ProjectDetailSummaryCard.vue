<script setup lang="ts">
import SummaryCard from '@/basics/SummaryCard.vue';

const props = defineProps<{
  sumSales: number;
  sumProfitRate: number;
  aveCost: number;
}>();

const sumSalesCard = (): string =>
  `¥ ${(Math.floor(props.sumSales / 1000000) === 0 ? props.sumSales / 1000 : props.sumSales / 1000000).toFixed(1)} ${
    Math.floor(props.sumSales / 1000000) === 0 ? 'K+' : 'M+'
  }`;

const sumProfitRateCard = (): string => `${Math.round(props.sumProfitRate * 100 * 10) / 10} %`;

const aveCostCard = (): string => `¥ ${Math.round(props.aveCost)?.toLocaleString()}`;
</script>

<template>
  <div class="flex flex-wrap">
    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
      <SummaryCard icon="fa-wallet" title="売上" :value="sumSalesCard()" />
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
      <SummaryCard icon="fa-users" title="利益率" :value="sumProfitRateCard()" />
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
      <SummaryCard icon="fa-user-plus" title="平均単価" :value="aveCostCard()" />
    </div>
  </div>
</template>
