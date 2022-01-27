import { createSlice } from "@reduxjs/toolkit";

import { roundNumber } from "../util/numberUtility";

const gravityDrainageSlice = createSlice({
  name: "gravity-drainage",
  initialState: {
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
  },
  reducers: {
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
    // setWaterSatBelowGasLevelBeforeGasInjection: (state, action) => {
    //   const { payload } = action;
    //   state.water_sat_below_gas_level_before_gas_injection =
    //     parseFloat(payload);
    // },
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
} = gravityDrainageSlice.actions;
export default gravityDrainageSlice.reducer;
