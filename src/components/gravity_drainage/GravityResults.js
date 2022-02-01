import { useEffect } from "react";
import echarts from "echarts";
import useEcharts from "react-hooks-echarts";
import { useSelector } from "react-redux";
import { fixedDecimalNumber } from "./../../util/numberUtility";
import GravityResultsChart from "./GravityResultsChart";

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

const GravityGraph = () => {
  const {
    levels_series_data,
    gas_pv,
    oil_pv,
    oil_layer_thickness_m,
    drainable_oil_volume_contacted_by_gas,
    oil_drainage_recovery_efficiency,
    total_oil_volume_contacted_by_gas,
  } = useSelector((state) => state.gravityDrainage);

  const [levels_chart, ref_levels_chart] = useEcharts();

  useEffect(() => {
    const l_chart = levels_chart.current;
    l_chart.setOption({
      ...gravity_graph_options,
      series: levels_series_data,
    });

    function resizeChart() {
      if (l_chart != null && l_chart !== undefined) l_chart.resize();
    }
    window.addEventListener("resize", resizeChart);
    return () => {
      window.removeEventListener("resize", resizeChart);
    };
  }, [levels_chart, levels_series_data]);

  return (
    <section className="mt-4">
      <div className="container border">
        <h4 className="mb-1">Results</h4>
        <div className="row">
          <div className="col-md">
            <h5 className="text-primary mb-4">Oil & Gas Levels</h5>
            <div
              className="mt-5"
              ref={ref_levels_chart}
              style={{ height: "480px" }}
            ></div>
            {/* <GravityResultsChart /> */}
          </div>
          <div className="col-md">
            <h5 className="text-primary">Volumetric Parameters</h5>
            <div className="row mt-3 d-flex align-items-center mx-2">
              <h6 className="text-primary fw-bold">Occupied Pore Volume</h6>
              <div class="row">
                <div class="col fs-5 text-white">
                  <div class="p-2 bg-danger">Gas Pore Volume</div>
                  <div class="ps-2 bg-danger">(E6rm3)</div>
                  <div class="p-2 bg-danger bg-gradient fw-bold">
                    {fixedDecimalNumber(gas_pv, 2)}
                  </div>
                </div>
                <div class="col fs-5 text-white">
                  <div class="p-2 bg-danger">Oil Pore Volume</div>
                  <div class="ps-2 bg-danger">(E6rm3)</div>
                  <div class="p-2 bg-danger bg-gradient fw-bold">
                    {fixedDecimalNumber(oil_pv, 2)}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3 d-flex align-items-center mx-2">
              <h6 className="text-primary fw-bold">Volumetric Efficiencies</h6>
              <div class="row">
                <div class="col fs-5 text-white">
                  <div class="p-2 bg-success">Contacted Oil Volume</div>
                  <div class="ps-2 bg-success">(E6rm3)</div>
                  <div class="p-2 bg-success bg-gradient fw-bold">
                    {fixedDecimalNumber(total_oil_volume_contacted_by_gas, 2)}
                  </div>
                </div>
                <div class="col fs-5 text-white">
                  <div class="p-2 bg-success">Drainable Oil Volume</div>
                  <div class="ps-2 bg-success">(E6rm3)</div>
                  <div class="p-2 bg-success bg-gradient fw-bolder">
                    {fixedDecimalNumber(
                      drainable_oil_volume_contacted_by_gas,
                      2
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3 d-flex align-items-center mx-2">
              <div class="row">
                <div class="col fs-5 text-white">
                  <div class="p-2 bg-success">Oil Layer Thickness</div>
                  <div class="ps-2 bg-success">(m)</div>
                  <div class="p-2 bg-success bg-gradient fw-bolder">
                    {fixedDecimalNumber(oil_layer_thickness_m, 2)}
                  </div>
                </div>
                <div class="col fs-5 text-white">
                  <div class="p-2 bg-success">Recovery Efficiency</div>
                  <div class="ps-2 bg-success">(%)</div>
                  <div class="p-2 bg-success bg-gradient fw-bolder">
                    {fixedDecimalNumber(oil_drainage_recovery_efficiency, 2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GravityGraph;
