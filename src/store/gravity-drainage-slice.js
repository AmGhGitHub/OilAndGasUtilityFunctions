import { createSlice } from "@reduxjs/toolkit";
import { roundNumber } from "../util/numberUtility";
import series_data from "./data/levels_data";

const initial_data = {
  levels_series_data: series_data,
  gas_vol: 1265,
  gas_bg: 0.003852,
  soi_gz: 0.47, //initial oil saturation in gas invading zone
  sor_gz: 0.2,
  swi_gz: 0.53,
  swr_gz: 0.25,
  sli_gz: 1.0,
  slr_gz: 0.45,
  swi_wz: 0.53,
  swr_wz: 0.15,
  oil_sf: 1.2,
  boi_gz: 1.32,
  bo_gz: 1.32,
};

function get_fluid_levels(
  a,
  b,
  gas_vol,
  gas_bg,
  swr_gz,
  sor_gz,
  soi_gz,
  oil_sf,
  swi_wz,
  swr_wz,
  ref_level = -994
) {
  const gas_pv = (gas_vol * gas_bg) / (1.0 - swr_gz - sor_gz);
  let gas_level_m = (-b + Math.sqrt(b * b + 4.0 * a * gas_pv)) / (2.0 * a);
  gas_level_m = -gas_level_m + ref_level;

  const residual_oil_volume_contacted_by_gas = soi_gz * gas_pv;
  const drainable_oil_volume_contacted_by_gas =
    gas_pv * (soi_gz - sor_gz) * oil_sf;

  const oil_pv = drainable_oil_volume_contacted_by_gas / (swi_wz - swr_wz);
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
    setOilAndGasLevels: (state) => {
      const a = 0.02290258577; //a_coeff_center_clive for hcvp vs height
      const b = -0.07259620926; //b_coeff_center_clive for hcpv vs height
      const {
        gas_vol,
        gas_bg,
        swr_gz,
        sor_gz,
        soi_gz,
        oil_sf,
        swi_wz,
        swr_wz,
      } = state;

      const [gas_level_m, oil_level_m] = get_fluid_levels(
        a,
        b,
        gas_vol,
        gas_bg,
        swr_gz,
        sor_gz,
        soi_gz,
        oil_sf,
        swi_wz,
        swr_wz
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
    },

    setGasVol: (state, action) => {
      const { payload } = action;
      state.gas_vol = parseFloat(payload);
    },
    setGasFVF: (state, action) => {
      const { payload } = action;
      state.gas_bg *= 1.0 + parseFloat(payload) / 100.0;
    },
    setSoiAndSwiGZ: (state, action) => {
      const { payload } = action;
      const soi = parseFloat(payload);
      state.soi_gz = soi;
      state.swi_gz = roundNumber(1 - soi, 3);
      state.sli_gz = roundNumber(soi + state.swi_gz, 3);
      if (state.swi_gz < state.swr_gz) state.swr_gz = state.swi_gz;
    },
    setSorGZ: (state, action) => {
      const { payload } = action;
      state.sor_gz = parseFloat(payload);
      const value = state.sor_gz + state.swr_gz;
      state.slr_gz = roundNumber(value, 3);
    },
    setSwrGZ: (state, action) => {
      const { payload } = action;
      state.swr_gz = parseFloat(payload);
      const value = state.sor_gz + state.swr_gz;
      state.slr_gz = roundNumber(value, 3);
    },
    setSwiWZ: (state, action) => {
      const { payload } = action;
      state.swi_wz = parseFloat(payload);
    },
    setSwrWZ: (state, action) => {
      const { payload } = action;
      state.swr_wz = parseFloat(payload);
    },
    setOilSF: (state, action) => {
      const { payload } = action;
      state.oil_sf = parseFloat(payload);
    },
  },
});

export const {
  setGasVol,
  setGasFVF,
  setSoiAndSwiGZ,
  setSorGZ,
  setSwrGZ,
  setSwiWZ,
  setSwrWZ,
  setOilSF,
  setOilAndGasLevels,
} = gravityDrainageSlice.actions;
export default gravityDrainageSlice.reducer;
