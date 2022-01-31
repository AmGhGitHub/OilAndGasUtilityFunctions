import { createSlice } from "@reduxjs/toolkit";
import series_data from "./data/levels_data";
import calc_gd_volumetric from "./../util/volumetric_calculator";

const initial_data = {
  // inpurt parameters
  levels_series_data: series_data,
  gas_vol: 400,
  gas_bg: 0.003852,
  soi_gz: 47, //initial oil saturation in gas invading zone
  sor_gz: 20,
  swi_gz: 53,
  swr_gz: 25,
  swi_wz: 53,
  swr_wz: 15,
  oil_sf: 1.2,
  //calculated parameters
  gas_pv: 0.0,
  oil_pv: 0.0,
  gas_level_m: 0.0,
  oil_level_m: 0.0,
  oil_layer_thickness_m: 0.0,
  total_oil_volume_contacted_by_gas: 0.0,
  drainable_oil_volume_contacted_by_gas: 0.0,
  oil_drainage_recovery_efficiency: 0.0,
};

const gravityDrainageSlice = createSlice({
  name: "gravity-drainage",
  initialState: {
    ...initial_data,
  },

  reducers: {
    setVolumetricValues: (state) => {
      const [
        gas_pv,
        oil_pv,
        gas_level_m,
        oil_level_m,
        oil_layer_thickness_m,
        total_oil_volume_contacted_by_gas,
        drainable_oil_volume_contacted_by_gas,
        oil_drainage_recovery_efficiency,
      ] = calc_gd_volumetric(
        0.02290258577,
        -0.07259620926,
        state.gas_vol,
        state.gas_bg,
        state.soi_gz,
        state.swr_gz,
        state.sor_gz,
        state.oil_sf,
        state.swi_wz,
        state.swr_wz
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

      state.gas_pv = gas_pv;
      state.oil_pv = oil_pv;
      state.oil_layer_thickness_m = oil_layer_thickness_m;
      state.oil_drainage_recovery_efficiency = oil_drainage_recovery_efficiency;
      state.total_oil_volume_contacted_by_gas =
        total_oil_volume_contacted_by_gas;
      state.drainable_oil_volume_contacted_by_gas =
        drainable_oil_volume_contacted_by_gas;
    },

    setGasVol: (state, action) => {
      const { payload } = action;
      state.gas_vol = parseFloat(payload);
    },
    setGasFVF: (state, action) => {
      const { payload } = action;
      const gas_bg_base = 0.003852; //base value for pure CO2
      state.gas_bg = gas_bg_base * (1.0 + parseFloat(payload) / 100.0);
    },
    setSoiAndSwiGZ: (state, action) => {
      const { payload } = action;
      const soi = parseFloat(payload);
      state.soi_gz = soi;
      state.swi_gz = 100 - soi;
      if (state.swi_gz < state.swr_gz) state.swr_gz = state.swi_gz;
      if (state.soi_gz < state.sor_gz) state.sor_gz = state.soi_gz;
    },
    setSorGZ: (state, action) => {
      const { payload } = action;
      state.sor_gz = parseFloat(payload);
      if (state.soi_gz < state.sor_gz) state.sor_gz = state.soi_gz;
    },
    setSwrGZ: (state, action) => {
      const { payload } = action;
      state.swr_gz = parseFloat(payload);
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
  setVolumetricValues,
} = gravityDrainageSlice.actions;
export default gravityDrainageSlice.reducer;
