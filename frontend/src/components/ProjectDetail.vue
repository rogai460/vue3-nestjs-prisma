<script setup lang="ts">
import { ref, onMounted } from "vue";
const table1 = ref();
const projectInfo = ref();
const data = ref();
const refSumSales = ref<number>(0);
const refSumCost = ref<number>(0);
const refAveCost = ref<number>(0);
const refSumProfit = ref<number>(0);
const refSumProfitRate = ref<number>(0);
const error = ref(null);
const getData = async () => {
  try {
    const response = await fetch("../projects.json");
    console.log(response); //statusが OKか確認する。
    if (!response.ok) {
      //okというプロパティがありtrue/falseで返す
      throw Error("No data available");
    }
    const json = await response.json();
    const projectHistory = json[0].projectHistory;
    projectInfo.value = json[0];

    const sumSales = projectHistory.reduce(
      (sumSales: number, ph) => sumSales + ph.sales,
      0
    );
    refSumSales.value = sumSales;

    const sumCost:number = projectHistory.reduce(
      (sumCost: number, ph) => sumCost + ph.cost,
      0
    );
    refSumCost.value = sumCost;
    refAveCost.value = Math.round((sumSales / projectHistory.length) * 10) / 10;

    const sumProfit = sumSales - sumCost;
    refSumProfit.value = sumProfit;

    const sumProfitRate = sumProfit / sumSales;
    refSumProfitRate.value = sumProfitRate;

    data.value = [
      ...projectHistory,
      {
        sales: sumSales,
        cost: sumCost,
        profit: sumProfit,
        profitRate: sumProfitRate,
        fullName: "合計",
        fullNameKana: "",
        sex: "",
        company: "",
      },
    ];
  } catch (err: any) {
    error.value = err.message;
    console.log(error.value);
  }
};
onMounted(() => {
  getData();
});
const thead = ["フルネーム", "カナ", "性別", "売", "コスト", "利益", "利益率"];
const tbody = [
  "fullName",
  "fullNameKana",
  "sex",
  {
    field: "sales",
    fn: (data) => {
      return `¥ ${data.sales.toLocaleString()}`;
    },
  },
  "cost",
  "profit",
  "profitRate",
];
</script>

<template>
  <div class="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
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
                    Math.floor(refSumSales / 1000000) === 0
                      ? refSumSales / 1000
                      : refSumSales / 1000000
                  ).toLocaleString()
                }}
                {{ Math.floor(refSumSales / 1000000) === 0 ? "K" : "M" }}
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
                {{ Math.round(refSumProfitRate * 100 * 10) / 10 }} %
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
                {{ refAveCost?.toLocaleString() }}
              </h3>
            </div>
          </div>
        </div>
        <!--/Metric Card-->
      </div>

    </div>

    <!--Divider-->
    <hr class="border-b-2 border-gray-400 my-8 mx-4" />

    <!-- <div class="w-full p-3"> -->
      <!--Table Card-->
      <div class="bg-white border rounded shadow">
        <div class="border-b p-3">
          <h5 class="font-bold uppercase text-gray-600">Table</h5>
        </div>
        <div class="p-5">
          <table class="w-full p-5 text-gray-700">
            <thead>
              <tr>
                <th v-for="th in thead" class="text-left text-blue-900">
                  {{ th }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="dt in data">
                <td>{{ dt.fullName }}</td>
                <td>{{ dt.fullNameKana }}</td>
                <td>{{ dt.sex }}</td>
                <td>¥ {{ dt.sales.toLocaleString() }}</td>
                <td>¥ {{ dt.cost.toLocaleString() }}</td>
                <td>¥ {{ (dt.sales - dt.cost).toLocaleString() }}</td>
                <td>
                  {{
                    Math.round(((dt.sales - dt.cost) / dt.sales) * 100 * 10) /
                    10
                  }}
                  %
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--/table Card-->
    </div>
  <!-- </div> -->
</template>
