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
    orient: "vertical",
    right: 0,
    top: "center",
  },
};

const GravityGraph = () => {
  const { levels_series_data } = useSelector((state) => state.gravityDrainage);

  const [chartRef, ref] = useEcharts();

  useEffect(() => {
    const chart = chartRef.current;
    chart.setOption({
      ...gravity_graph_options,
      series: levels_series_data,
    });

    function resizeChart() {
      if (chart != null && chart !== undefined) chart.resize();
    }

    window.addEventListener("resize", resizeChart);

    return () => {
      window.removeEventListener("resize", resizeChart);
    };
  }, [chartRef, levels_series_data]);

  return (
    <section className="mt-4">
      <div className="container border">
        <h4 className="mb-3">Results</h4>
        <div className="row my-3">
          <h5 className="text-primary">Levels</h5>
          <div ref={ref} style={{ height: "600px" }}></div>
        </div>
      </div>
    </section>
  );
};

export default GravityGraph;
