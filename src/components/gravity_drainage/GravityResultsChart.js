import { useEffect } from "react";
import echarts from "echarts";
import useEcharts from "react-hooks-echarts";
import { useSelector } from "react-redux";

const gravity_graph_options = {
  xAxis: {
    position: "top",
    max: 2800,
    min: -2000,
    axisLabel: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    name: "Depth (m ss)",
    nameLocation: "middle",
    nameRotate: 90,
    nameGap: 50,
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
    orient: "horizontal",
    top: -5,
  },
};

const GravityResultsChart = () => {
  const { levels_series_data } = useSelector((state) => state.gravityDrainage);
  const [chart, ref_chart] = useEcharts();

  useEffect(() => {
    const levels_chart = chart.current;
    levels_chart.setOption({
      ...gravity_graph_options,
      series: levels_series_data,
    });

    function resizeChart() {
      if (levels_chart != null && levels_chart !== undefined)
        levels_chart.resize();
    }
    window.addEventListener("resize", resizeChart);
    return () => {
      window.removeEventListener("resize", resizeChart);
    };
  }, [chart, levels_series_data]);

  return <div ref={ref_chart} style={{ height: "550px" }}></div>;
};

export default GravityResultsChart;
