import { useEffect } from "react";
import echarts from "echarts";
import useEcharts from "react-hooks-echarts";
import { useSelector } from "react-redux";

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
    orient: "horizontal",
    top: -5,
  },
};

const recovery_graph_options = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ["product", "2012", "2013", "2014", "2015"],
      ["Matcha Latte", 41.1, 30.4, 65.1, 53.3],
      ["Milk Tea", 86.5, 92.1, 85.7, 83.1],
      ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4],
    ],
  },
  xAxis: [
    { type: "category", gridIndex: 0 },
    { type: "category", gridIndex: 1 },
  ],
  yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
  grid: [{ bottom: "55%" }, { top: "55%" }],
  series: [
    // These series are in the first grid.
    { type: "bar", seriesLayoutBy: "row" },
    { type: "bar", seriesLayoutBy: "row" },
    { type: "bar", seriesLayoutBy: "row" },
    // These series are in the second grid.
    { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
    { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
    { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
    { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
  ],
};

const GravityGraph = () => {
  const { levels_series_data } = useSelector((state) => state.gravityDrainage);

  const [levels_chart, ref_levels_chart] = useEcharts();
  const [recovery_chart, ref_recovery_chart] = useEcharts();

  useEffect(() => {
    const l_chart = levels_chart.current;
    const r_chart = recovery_chart.current;
    l_chart.setOption({
      ...gravity_graph_options,
      series: levels_series_data,
    });
    r_chart.setOption({
      ...recovery_graph_options,
    });

    function resizeChart() {
      if (l_chart != null && l_chart !== undefined) l_chart.resize();
      if (r_chart != null && r_chart !== undefined) r_chart.resize();
    }
    window.addEventListener("resize", resizeChart);
    return () => {
      window.removeEventListener("resize", resizeChart);
    };
  }, [levels_chart, recovery_chart, levels_series_data]);

  return (
    <section className="my-4">
      <div className="container border">
        <h4 className="mb-3">Results</h4>
        <div className="row">
          <div className="col mx-3">
            <h5 className="text-primary">Levels</h5>
            <div ref={ref_levels_chart} style={{ height: "500px" }}></div>
          </div>
          <div className="col">
            <h5 className="text-primary">Recovery</h5>
            <div ref={ref_recovery_chart} style={{ height: "500px" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GravityGraph;
