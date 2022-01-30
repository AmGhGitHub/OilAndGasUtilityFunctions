import { createSlice } from "@reduxjs/toolkit";
import { fixedDecimalNumber } from "../util/numberUtility";
import series_data from "./data/levels_data";

const initial_data = {
  // inpurt parameters
  levels_series_data: series_data,
  gas_vol: 400,
  gas_bg: 0.003852,
  soi_gz: 47, //initial oil saturation in gas invading zone
  sor_gz: 20,
  swi_gz: 53,
  swr_gz: 25,
  sli_gz: 1.0,
  slr_gz: 45,
  swi_wz: 53,
  swr_wz: 15,
  oil_sf: 1.2,
  boi_gz: 1.32,
  bo_gz: 1.32,
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
  let gas_pv = 0.0;
  let oil_pv = 0.0;
  let gas_level_m = ref_level;
  let oil_level_m = ref_level;
  let oil_layer_thickness_m = 0.0;
  let total_oil_volume_contacted_by_gas = 0.0;
  let drainable_oil_volume_contacted_by_gas = 0.0;
  let oil_drainage_recovery_efficiency = 0.0;

  if (gas_vol > 0) {
    gas_pv = (gas_vol * gas_bg * 100.0) / (100.0 - swr_gz - sor_gz);
    gas_level_m -= (-b + Math.sqrt(b * b + 4.0 * a * gas_pv)) / (2.0 * a);

    total_oil_volume_contacted_by_gas = gas_pv * (soi_gz / 100.0);
    drainable_oil_volume_contacted_by_gas =
      gas_pv * ((soi_gz - sor_gz) / 100.0) * oil_sf;
    oil_drainage_recovery_efficiency =
      (100.0 * drainable_oil_volume_contacted_by_gas) /
      (total_oil_volume_contacted_by_gas * oil_sf);
    oil_pv = (drainable_oil_volume_contacted_by_gas * 100) / (swi_wz - swr_wz);
    oil_level_m -=
      (-b + Math.sqrt(b * b + 4.0 * a * (gas_pv + oil_pv))) / (2.0 * a);
    oil_layer_thickness_m = gas_level_m - oil_level_m;
  }
  return [
    gas_pv,
    oil_pv,
    gas_level_m,
    oil_level_m,
    oil_layer_thickness_m,
    total_oil_volume_contacted_by_gas,
    drainable_oil_volume_contacted_by_gas,
    oil_drainage_recovery_efficiency,
  ];
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

      const [
        gas_pv,
        oil_pv,
        gas_level_m,
        oil_level_m,
        oil_layer_thickness_m,
        total_oil_volume_contacted_by_gas,
        drainable_oil_volume_contacted_by_gas,
        oil_drainage_recovery_efficiency,
      ] = get_fluid_levels(
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

      // console.log(
      //   "gas_pv:\n",
      //   gas_pv,
      //   "\noil_pv:\n",
      //   oil_pv,
      //   "\ngas_level_m:\n",
      //   gas_level_m,
      //   "\noil_level_m:\n",
      //   oil_level_m,
      //   "\noil_layer_thickness_m:\n",
      //   oil_layer_thickness_m,
      //   "\ntotal_oil_volume_contacted_by_gas:\n",
      //   total_oil_volume_contacted_by_gas,
      //   "\ndrainable_oil_volume_contacted_by_gas:\n",
      //   drainable_oil_volume_contacted_by_gas,
      //   "\noil_drainage_recovery_efficiency:\n",
      //   oil_drainage_recovery_efficiency
      // );

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
      const gas_bg_base = 0.003852; //base value for pure CO2
      state.gas_bg = gas_bg_base * (1.0 + parseFloat(payload) / 100.0);
    },
    setSoiAndSwiGZ: (state, action) => {
      const { payload } = action;
      const soi = parseFloat(payload);
      state.soi_gz = soi;
      state.swi_gz = 100 - soi;
      state.sli_gz = soi + state.swi_gz;
      if (state.swi_gz < state.swr_gz) state.swr_gz = state.swi_gz;
    },
    setSorGZ: (state, action) => {
      const { payload } = action;
      state.sor_gz = parseFloat(payload);
      state.slr_gz = state.sor_gz + state.swr_gz;
    },
    setSwrGZ: (state, action) => {
      const { payload } = action;
      state.swr_gz = parseFloat(payload);
      state.slr_gz = state.sor_gz + state.swr_gz;
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
