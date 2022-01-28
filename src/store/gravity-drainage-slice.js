import { createSlice } from "@reduxjs/toolkit";
import { roundNumber } from "../util/numberUtility";
import series_data from "./data/levels_data";

const initial_data = {
  levels_series_data: series_data,
  cum_injected_gas_volume: 1265,
  gas_fvf: 0.003852,
  oil_sat_before_gas_injection: 0.47,
  oil_sat_after_gas_injection: 0.2,
  water_sat_before_gas_injection: 0.53,
  water_sat_after_gas_injection: 0.25,
  irr_liquid_sat_before_gas_injection: 1.0,
  irr_liquid_sat_after_gas_injection: 0.45,
  oil_swelling_factor: 1.2,
  water_sat_below_gas_level_before_gas_injection: 0.53,
  water_sat_below_gas_level_after_gas_injection: 0.15,
  oil_fvf_before_gas_injection: 1.32,
  oil_fvf_after_gas_injection: 1.32,
};

function get_fluid_levels(
  a,
  b,
  gv,
  bg,
  swrg,
  sorg,
  soig,
  sf,
  swi_below_gas,
  swr_below_gas,
  ref_level = -994
) {
  const gas_pv = (gv * bg) / (1.0 - swrg - sorg);
  let gas_level_m = (-b + Math.sqrt(b * b + 4.0 * a * gas_pv)) / (2.0 * a);
  gas_level_m = -gas_level_m + ref_level;

  const residual_oil_volume_contacted_by_gas = soig * gas_pv;
  const drainable_oil_volume_contacted_by_gas = gas_pv * (soig - sorg) * sf;

  const oil_pv =
    drainable_oil_volume_contacted_by_gas / (swi_below_gas - swr_below_gas);
  let oil_level_m =
    (-b + Math.sqrt(b * b + 4.0 * a * (gas_pv + oil_pv))) / (2.0 * a);
  oil_level_m = -oil_level_m + ref_level;

  return [gas_level_m, oil_level_m, gas_pv, oil_pv];
}

const gravityDrainageSlice = createSlice({
  name: "gravity-drainage",
  initialState: {
    ...initial_data,
  },

  reducers: {
    setLevelSeriesData: (state) => {
      const a_coeff_center_clive = 0.02290258577;
      const b_coeff_center_clive = -0.07259620926;
      const a = a_coeff_center_clive;
      const b = b_coeff_center_clive;
      const {
        cum_injected_gas_volume: gv,
        gas_fvf: bg,
        water_sat_after_gas_injection: swrg,
        // water_sat_before_gas_injection: swig,
        oil_sat_after_gas_injection: sorg,
        oil_sat_before_gas_injection: soig,
        oil_swelling_factor: sf,
        water_sat_below_gas_level_before_gas_injection: swi_below_gas,
        water_sat_below_gas_level_after_gas_injection: swr_below_gas,
      } = state;

      const [gas_level_m, oil_level_m] = get_fluid_levels(
        a,
        b,
        gv,
        bg,
        swrg,
        sorg,
        soig,
        sf,
        swi_below_gas,
        swr_below_gas
      );

      state.levels_series_data = [
        ...series_data,
        // GD- Gas Level
        {
          name: "GD-Gas Level",
          data: [
            [-2200, gas_level_m],
            [2800, gas_level_m],
          ],
          type: "line",
          showSymbol: false,
          lineStyle: {
            type: "dashed",
            width: 3,
          },
          itemStyle: {
            color: "#f5ce42",
          },
        },
        // GD - Oil Level
        {
          name: "GD-Oil Level",
          data: [
            [-2000, oil_level_m],
            [2800, oil_level_m],
          ],
          type: "line",
          showSymbol: false,
          lineStyle: {
            type: "dashed",
            width: 3,
          },
          itemStyle: {
            color: "#9fd192",
          },
        },
      ];

      // state.levels_series_data = data;
      // console.log(state.levels_series_data);
    },

    setCumInjectedGasVolume: (state, action) => {
      const { payload } = action;
      state.cum_injected_gas_volume = parseFloat(payload);
    },
    setGasFVF: (state, action) => {
      const { payload } = action;
      state.gas_fvf = parseFloat(payload);
    },
    setOilAndWaterSatBeforeGasInjection: (state, action) => {
      const { payload } = action;
      const oil_sat_before_gas_injection = parseFloat(payload);
      state.oil_sat_before_gas_injection = oil_sat_before_gas_injection;
      state.water_sat_before_gas_injection = roundNumber(
        1 - oil_sat_before_gas_injection,
        3
      );
      state.irr_liquid_sat_before_gas_injection = roundNumber(
        oil_sat_before_gas_injection + state.water_sat_before_gas_injection,
        3
      );
      if (
        state.water_sat_before_gas_injection <
        state.water_sat_after_gas_injection
      )
        state.water_sat_after_gas_injection =
          state.water_sat_before_gas_injection;
    },
    setOilSatAfterGasInjection: (state, action) => {
      const { payload } = action;
      state.oil_sat_after_gas_injection = parseFloat(payload);
      const value =
        state.oil_sat_after_gas_injection + state.water_sat_after_gas_injection;
      state.irr_liquid_sat_after_gas_injection = roundNumber(value, 3);
    },
    setWaterSatAfterGasInjection: (state, action) => {
      const { payload } = action;
      state.water_sat_after_gas_injection = parseFloat(payload);
      const value =
        state.oil_sat_after_gas_injection + state.water_sat_after_gas_injection;

      state.irr_liquid_sat_after_gas_injection = roundNumber(value, 3);
    },
    setWaterSatBelowGasLevelBeforeGasInjection: (state, action) => {
      const { payload } = action;
      state.water_sat_below_gas_level_before_gas_injection =
        parseFloat(payload);
    },
    setWaterSatBelowGasLevelAfterGasInjection: (state, action) => {
      const { payload } = action;
      state.water_sat_below_gas_level_after_gas_injection = parseFloat(payload);
    },
    setOilSwellingFactor: (state, action) => {
      const { payload } = action;
      state.oil_swelling_factor = parseFloat(payload);
    },
    setOilFVFAfterGasInjection: (state, action) => {
      const { payload } = action;
      state.oil_fvf_after_gas_injection = parseFloat(payload);
    },
  },
});

export const {
  setCumInjectedGasVolume,
  setGasFVF,
  setOilAndWaterSatBeforeGasInjection,
  setOilSatAfterGasInjection,
  setWaterSatAfterGasInjection,
  setWaterSatBelowGasLevelBeforeGasInjection,
  setWaterSatBelowGasLevelAfterGasInjection,
  setOilSwellingFactor,
  setOilFVFAfterGasInjection,
  setOilFVFBeforeGasInjection,
  setLevelSeriesData,
} = gravityDrainageSlice.actions;
export default gravityDrainageSlice.reducer;
