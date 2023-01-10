<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Bar } from "vue-chartjs";
import { Line } from "vue-chartjs";
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  ChartData,
} from "chart.js";
import ProjectDetailSummaryCard from "@/components/ProjectDetail/ProjectDetailSummaryCard.vue";
import {
  ProjectResponse,
  ProjectHistoryGroupBy,
  ProjectHistoryGroupByMonth,
} from "@/@types/ApiReqRes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

const projectList = ref<ProjectResponse[]>([]);
const projectHistoryGroupList = ref<ProjectHistoryGroupBy[]>([]);
const projectHistoryGroupMonthList = ref<ProjectHistoryGroupByMonth[]>([]);
const error = ref(null);

const getProject = async () => {
  try {
    // const response = await fetch("../production/project.json");
    const response = await fetch("http://127.0.0.1:3000/project");
    console.log(response); //statusが OKか確認する。
    if (!response.ok) {
      throw Error("No data available");
    }
    projectList.value = await response.json();
  } catch (err: any) {
    error.value = err.message;
    console.log(error.value);
  }
};

const getProjectHistoryGroup = async () => {
  try {
    // const response = await fetch("../production/project/history.json");
    const response = await fetch("http://127.0.0.1:3000/project/history/group");
    console.log(response); //statusが OKか確認する。
    if (!response.ok) {
      //okというプロパティがありtrue/falseで返す
      throw Error("No data available");
    }
    projectHistoryGroupList.value = await response.json();
  } catch (err: any) {
    error.value = err.message;
    console.log(error.value);
  }
};
const getProjectHistoryGroupMonth = async () => {
  try {
    // const response = await fetch("../production/project/history.json");
    const response = await fetch(
      "http://127.0.0.1:3000/project/history/group/month"
    );
    console.log(response); //statusが OKか確認する。
    if (!response.ok) {
      //okというプロパティがありtrue/falseで返す
      throw Error("No data available");
    }
    projectHistoryGroupMonthList.value = await response.json();
  } catch (err: any) {
    error.value = err.message;
    console.log(error.value);
  }
};
const summaryList = computed(() => {
  return projectList.value
    .filter((pl) => {
      return pl.id != "1";
    })
    .map((pl) => {
      const projectHistoryGroup = projectHistoryGroupList.value.find(
        (pg) => String(pg.projectId) == String(pl.id)
      );
      const sales = projectHistoryGroup?._sum.sales ?? 0;
      const cost = projectHistoryGroup?._sum.cost ?? 0;
      const sumProfitRate = sales && cost ? (sales - cost) / sales : 0;
      return {
        id: pl.id,
        projectNameMask: pl.projectNameMask,
        projectName: pl.projectName,
        endUser: pl.endUser,
        sumSales: sales,
        sumCost: cost,
        sumProfitRate: sumProfitRate,
        aveCost: projectHistoryGroup?._avg.cost ?? 0,
      };
    });
});

const totalSumSales = computed(() =>
  summaryList.value.reduce(
    (sumSales: number, pl) => sumSales + (pl.sumSales ? pl.sumSales : 0),
    0
  )
);

const totalSumCost = computed(() =>
  summaryList.value.reduce(
    (sumCost: number, pl) => sumCost + (pl.sumCost ? pl.sumCost : 0),
    0
  )
);

const totalAveCost = computed(() => {
  const sumAveCost = summaryList.value.reduce(
    (sumAveCost: number, pl) => sumAveCost + (pl.aveCost ? pl.aveCost : 0),
    0
  );
  return Math.round((sumAveCost / summaryList.value.length) * 10) / 10;
});

const totalSumProfitRate = computed(
  () => (totalSumSales.value - totalSumCost.value) / totalSumSales.value
);

const chartData1 = computed(() => {
  const labels: string[] = projectHistoryGroupMonthList.value.map(
    (gm) => gm.label
  );
  const data: number[] = projectHistoryGroupMonthList.value.map(
    (gm) => sales(gm.data) / 1000
  );
  return {
    labels: labels,
    datasets: [
      {
        label: "売上",
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        data: data,
        tension: 0.5,
      },
    ],
  };
});

const chartData2 = computed(() => {
  const labels: string[] = projectHistoryGroupMonthList.value.map(
    (gm) => gm.label
  );
  const data2: number[] = projectHistoryGroupMonthList.value.map(
    (gm) => profit(gm.data) / 1000
  );
  return {
    labels: labels,
    datasets: [
      {
        label: "利益",
        backgroundColor: "#f87979",
        borderColor: "#f87979",
        data: data2,
        tension: 0.5,
      },
    ],
  };
});

const sales = (projectHistoryGroupBy: ProjectHistoryGroupBy[]) => {
  return projectHistoryGroupBy
    .filter((d) => String(d.projectId) != "1")
    .reduce((sum, d) => sum + d._sum.sales, 0);
};

const profit = (projectHistoryGroupBy: ProjectHistoryGroupBy[]) => {
  return projectHistoryGroupBy
    .filter((d) => String(d.projectId) != "1")
    .reduce((sum, d) => sum + (d._sum.sales - d._sum.cost), 0);
};
const chartOptions1 = {
  scales: {
    y: {
      beginAtZero: false,
    },
  },
  responsive: true,
  maintainAspectRatio: false, //元のcanvasのサイズを保つか否か
  spanGaps: false, //値が抜け落ちていた時、埋めるか否か
};
const chartOptions2 = {
  animations: {
    tension: {
      // duration: 1000,
      // easing: "linear",
      // from: 1,
      // to: 0,
      delay: 10,
    },
  },
  legend: {
    //凡例
    display: true,
    position: "right", //どこに表示するか
    labels: { fontSize: 15 },
  },
  responsive: true,
  maintainAspectRatio: false, //元のcanvasのサイズを保つか否か
  spanGaps: false, //値が抜け落ちていた時、埋めるか否か
  elements: {
    line: {
      //折れ線グラフの全ての線に適用される設定。
      //個別に設定する場合はdatasets内でlineTension:'任意の数字'で設定
      tension: 0,
      fill: false,
    },
  },
};

const donutData: any = computed(() => {
  const d = summaryList.value.map((sl) => sl.sumSales);
  return {
    labels: ["Y案件", "USEN案件", "T案件"],
    datasets: [
      {
        backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
        data: d ? d : [],
      },
    ],
  };
});
const donutOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

onMounted(() => {
  getProject();
  getProjectHistoryGroup();
  getProjectHistoryGroupMonth();
});
</script>
<template>
  <div class="w-full md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
    <h1
      class="px-4 py-3 text-3xl font-bold underline text-gray-600 dark:text-white"
    >
      Total
    </h1>
    <ProjectDetailSummaryCard
      :sumSales="totalSumSales"
      :sumProfitRate="totalSumProfitRate"
      :aveCost="totalAveCost"
    />
    <h1
      class="px-4 py-3 text-3xl font-bold underline text-gray-600 dark:text-white"
    >
      年間売上推移と売上割合
    </h1>
    <div class="grid gap-4 grid-cols-3 py-5">
      <div style="position: relative; width: 100%; height: 250px">
        <Bar id="bar-chart-id" :options="chartOptions1" :data="chartData1" />
      </div>
      <div style="position: relative; width: 100%; height: 250px">
        <Line id="line-chart-id" :options="chartOptions2" :data="chartData2" />
      </div>
      <div style="position: relative; width: 100%; height: 250px">
        <Doughnut
          id="line-chart-id"
          :data="donutData"
          :options="donutOptions"
        />
      </div>
    </div>

    <div v-for="summary in summaryList">
      <h1
        class="px-4 py-3 text-3xl font-bold underline text-gray-600 dark:text-white"
      >
        <router-link
          :to="{ name: 'project-detail', query: { projectId: summary.id } }"
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >{{ summary.projectName }}</router-link
        >
      </h1>

      <ProjectDetailSummaryCard
        :sumSales="summary.sumSales"
        :sumProfitRate="summary.sumProfitRate"
        :aveCost="summary.aveCost"
      />
    </div>
  </div>
</template>
