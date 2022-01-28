import React, { useEffect } from "react";
import echarts from "echarts";
import useEcharts from "react-hooks-echarts";

const colors = ["#5470C6", "#EE6666"];
const gravity_graph_options = {
  xAxis: {
    position: "top",
    max: 2800,
    min: -2000,
  },
  yAxis: {
    offset: 0,
    inverse: false,
    max: -988,
    min: -1040,
    maxInterval: 2,
    axisLine: {
      onZero: false,
    },
  },

  legend: {
    orient: "vertical",
    right: 10,
    top: "center",
  },
  series: [
    {
      name: "Clive Top",
      data: [
        [-2085.8, -1036.4],
        [-1945.4, -1034.3],
        [-1768.5, -1032.2],
        [-1609.9, -1030.3],
        [-1404.4, -1027.8],
        [-1258.8, -1026.1],
        [-1180.8, -1024.8],
        [-1027.3, -1023.4],
        [-892.1, -1021.8],
        [-769.8, -1019.3],
        [-715.2, -1018.3],
        [-632.0, -1018.1],
        [-548.8, -1016.7],
        [-455.1, -1015.3],
        [-345.9, -1015.6],
        [-254.9, -1016.0],
        [-143.0, -1014.7],
        [5.2, -1010.7],
        [158.6, -1008.1],
        [314.7, -1002.7],
        [392.7, -1001.9],
        [460.3, -1001.1],
        [559.2, -1001.3],
        [736.0, -995.9],
        [863.5, -991.8],
        [918.1, -990.2],
        [964.9, -989.7],
        [1050.7, -991.5],
        [1102.7, -994.2],
        [1191.2, -998.7],
        [1297.8, -1001.9],
        [1414.8, -1005.0],
        [1508.5, -1007.0],
        [1615.1, -1009.8],
        [1739.9, -1010.2],
        [1911.6, -1012.6],
        [1974.0, -1012.7],
        [2083.2, -1011.9],
        [2179.5, -1012.3],
        [2340.7, -1019.3],
        [2426.5, -1024.7],
        [2486.3, -1029.6],
        [2574.8, -1034.5],
        [2673.6, -1037.6],
        [2754.2, -1038.8],
        [2780.2, -1038.7],
      ],
      type: "line",
      showSymbol: false,
      smooth: true,
      itemStyle: {
        width: 4,
        color: "#947100",
      },
    },
    {
      name: "Top of TS",
      data: [
        [-1898.6, -1038.7],
        [-1638.5, -1035.7],
        [-1487.6, -1034.0],
        [-1310.8, -1031.7],
        [-1154.7, -1029.9],
        [-941.5, -1028.0],
        [-741.2, -1024.5],
        [-608.6, -1023.5],
        [-460.3, -1021.1],
        [-364.1, -1021.5],
        [-218.5, -1021.8],
        [-20.8, -1017.0],
        [158.6, -1014.0],
        [247.1, -1011.2],
        [366.7, -1008.7],
        [447.3, -1008.4],
        [525.4, -1008.8],
        [639.8, -1007.3],
        [798.4, -1002.4],
        [915.5, -999.0],
        [970.1, -998.0],
        [1068.9, -1000.6],
        [1180.8, -1005.1],
        [1308.2, -1009.0],
        [1451.2, -1011.8],
        [1628.1, -1016.6],
        [1708.7, -1016.9],
        [1929.8, -1019.5],
        [1989.6, -1019.5],
        [2114.4, -1018.5],
        [2184.7, -1018.9],
        [2293.9, -1022.9],
        [2392.7, -1029.0],
        [2460.3, -1034.3],
        [2538.4, -1038.7],
      ],
      type: "line",
      showSymbol: false,
      smooth: true,
      lineStyle: {
        type: "dashed",
        width: 1,
      },
      itemStyle: {
        color: "#026666",
      },
    },
    {
      name: "Bottom of TS",
      data: [
        [-1586.5, -1038.8],
        [-1407.0, -1036.9],
        [-1308.2, -1035.4],
        [-1196.4, -1034.3],
        [-1035.1, -1032.3],
        [-871.3, -1030.7],
        [-751.6, -1027.8],
        [-639.8, -1027.3],
        [-455.1, -1024.8],
        [-366.7, -1024.9],
        [-239.3, -1025.4],
        [-101.4, -1022.5],
        [-23.4, -1020.5],
        [80.6, -1017.9],
        [156.0, -1017.0],
        [293.9, -1012.8],
        [413.5, -1011.3],
        [515.0, -1011.6],
        [561.8, -1011.8],
        [697.0, -1008.9],
        [821.8, -1005.0],
        [902.5, -1002.4],
        [977.9, -1001.3],
        [1089.7, -1004.7],
        [1167.8, -1007.5],
        [1274.4, -1010.6],
        [1391.4, -1013.3],
        [1490.2, -1015.8],
        [1581.3, -1018.4],
        [1625.5, -1019.8],
        [1765.9, -1020.9],
        [1885.6, -1022.3],
        [1945.4, -1022.4],
        [2088.4, -1021.4],
        [2166.4, -1021.6],
        [2304.3, -1026.0],
        [2413.5, -1032.9],
        [2502.0, -1038.7],
      ],
      type: "line",
      showSymbol: false,
      smooth: true,
      lineStyle: {
        type: "dashed",
        width: 1,
      },
      itemStyle: {
        color: "gray",
      },
    },
    // Injectors
    {
      name: "Injectors",
      data: [
        [-570, -1017],
        [2295, -1017],
      ],
      type: "line",
      showSymbol: false,
      lineStyle: {
        type: "solid",
        width: 3,
      },
      itemStyle: {
        color: "red",
      },
    },
    // // Producers
    {
      name: "Producers",
      data: [
        [-800, -1020],
        [2355, -1020],
      ],
      type: "line",
      showSymbol: false,
      lineStyle: {
        type: "solid",
        width: 3,
      },
      itemStyle: {
        color: "green",
      },
    },
    // WOC
    {
      name: "WOC",
      data: [
        [-990, -1023],
        [2400, -1023],
      ],
      type: "line",
      showSymbol: false,
      lineStyle: {
        type: "solid",
        width: 3,
      },
      itemStyle: {
        color: "blue",
      },
    },
  ],
};

const GravityGraph = () => {
  const [chartRef, ref] = useEcharts();

  useEffect(() => {
    const chart = chartRef.current;
    chart.setOption({ ...gravity_graph_options });

    function resizeChart() {
      if (chart != null && chart !== undefined) chart.resize();
    }

    window.addEventListener("resize", resizeChart);

    return () => {
      window.removeEventListener("resize", resizeChart);
    };
  }, [chartRef]);

  return (
    <>
      <section className="mt-4">
        <div className="container border">
          <h4 className="mb-3">Results</h4>
          <div className="row my-3">
            <h5 className="text-primary">Levels</h5>
            <div ref={ref} style={{ height: "600px" }}></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GravityGraph;
