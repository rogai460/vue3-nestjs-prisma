<script setup lang="ts">
defineProps<{
  sumSales: number;
  sumProfitRate: number;
  aveCost: number;
}>();
</script>

<template>
  <!--Console Content-->
  <div class="flex flex-wrap">
    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
      <!--Metric Card-->
      <div class="bg-white border rounded shadow p-2">
        <div class="flex flex-row items-center">
          <div class="flex-shrink pr-4">
            <div class="rounded p-3 bg-green-600">
              <!-- <img src="../assets/briefcase.svg" alt=""> -->
              <i class="fa fa-wallet fa-2x fa-fw fa-inverse"></i>
            </div>
          </div>
          <div class="flex-1 text-right md:text-center">
            <h5 class="font-bold uppercase text-gray-500">売上</h5>
            <h3 class="font-bold text-3xl">
              ¥
              {{
                Math.round(
                  Math.floor(sumSales / 1000000) === 0
                    ? sumSales / 1000
                    : sumSales / 1000000
                ).toLocaleString()
              }}
              {{ Math.floor(sumSales / 1000000) === 0 ? "K" : "M" }}
              <!-- <span class="text-green-500"
                  ><i class="fas fa-caret-up"></i
                ></span> -->
            </h3>
          </div>
        </div>
      </div>
      <!--/Metric Card-->
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
      <!--Metric Card-->
      <div class="bg-white border rounded shadow p-2">
        <div class="flex flex-row items-center">
          <div class="flex-shrink pr-4">
            <div class="rounded p-3 bg-pink-600">
              <i class="fas fa-users fa-2x fa-fw fa-inverse"></i>
            </div>
          </div>
          <div class="flex-1 text-right md:text-center">
            <h5 class="font-bold uppercase text-gray-500">利益率</h5>
            <h3 class="font-bold text-3xl">
              {{ Math.round(sumProfitRate * 100 * 10) / 10 }} %
            </h3>
          </div>
        </div>
      </div>
      <!--/Metric Card-->
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
      <!--Metric Card-->
      <div class="bg-white border rounded shadow p-2">
        <div class="flex flex-row items-center">
          <div class="flex-shrink pr-4">
            <div class="rounded p-3 bg-yellow-600">
              <i class="fas fa-user-plus fa-2x fa-fw fa-inverse"></i>
            </div>
          </div>
          <div class="flex-1 text-right md:text-center">
            <h5 class="font-bold uppercase text-gray-500">平均単価</h5>
            <h3 class="font-bold text-3xl">
              ¥ {{ Math.round(aveCost)?.toLocaleString() }}
            </h3>
          </div>
        </div>
      </div>
      <!--/Metric Card-->
    </div>
  </div>
</template>
