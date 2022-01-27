import { useSelector, useDispatch } from "react-redux";

import {
  setCumInjectedGasVolume,
  setGasFVF,
  setOilAndWaterSatBeforeGasInjection,
  setOilSatAfterGasInjection,
  setWaterSatAfterGasInjection,
  setOilFVFAfterGasInjection,
  setOilSwellingFactor,
  setWaterSatBelowGasLevelAfterGasInjection,
} from "../../store/gravity-drainage-slice";

const GravityInputs = () => {
  const {
    cum_injected_gas_volume,
    gas_fvf,
    oil_sat_before_gas_injection,
    oil_sat_after_gas_injection,
    water_sat_before_gas_injection,
    water_sat_after_gas_injection,
    oil_swelling_factor,
    water_sat_below_gas_level_after_gas_injection,
    oil_fvf_before_gas_injection,
    oil_fvf_after_gas_injection,
    irr_liquid_sat_before_gas_injection,
    irr_liquid_sat_after_gas_injection,
  } = useSelector((state) => state.gravityDrainage);
  const dispatch = useDispatch();

  return (
    <>
      <table className="table table-sm table-bordered border-dark">
        <thead>
          <tr>
            <th rowSpan="2" colSpan="1" className="align-middle fs-5">
              Quantity
            </th>
            <th rowSpan="2" colSpan="1" className="align-middle fs-5">
              Unit
            </th>
            <th
              rowSpan="1"
              colSpan="2"
              className="text-center align-middle fs-5"
            >
              Value
            </th>
          </tr>
          <tr>
            <th className="text-center">Before Gas Inj.</th>
            <th className="text-center">After Gas Inj.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Injected Gas Volume</td>
            <td>e6sm3</td>
            <td className="text-center">
              <strong>-</strong>
            </td>
            <td>
              <input
                type="number"
                min="0"
                max="3000"
                value={cum_injected_gas_volume}
                className="form-control form-control-sm"
                onChange={(e) =>
                  dispatch(setCumInjectedGasVolume(e.target.value))
                }
              />
            </td>
          </tr>
          <tr>
            <td>Injected Gas FVF (Bg)</td>
            <td>rm3/sm3</td>
            <td className="text-center">
              <strong>-</strong>
            </td>
            <td>
              <input
                type="number"
                className="form-control form-control-sm"
                min="0"
                max="0.03"
                step="0.000001"
                value={gas_fvf}
                onChange={(e) => dispatch(setGasFVF(e.target.value))}
              />
            </td>
          </tr>
          <tr>
            <td>Oil Sat. (Gas Invaded Zone)</td>
            <td>fraction</td>
            <td className="text-center">
              <input
                type="number"
                className="form-control form-control-sm"
                min="0.1"
                max="0.5"
                step="0.01"
                value={oil_sat_before_gas_injection}
                onChange={(e) =>
                  dispatch(setOilAndWaterSatBeforeGasInjection(e.target.value))
                }
              />
            </td>
            <td>
              {/* Oil sat after gas injection */}
              <input
                type="number"
                className="form-control form-control-sm"
                min="0"
                max={oil_sat_before_gas_injection}
                step="0.01"
                value={oil_sat_after_gas_injection}
                onChange={(e) =>
                  dispatch(setOilSatAfterGasInjection(e.target.value))
                }
              />
            </td>
          </tr>
          <tr>
            <td>Water Sat. (Gas Invaded Zone)</td>
            <td>fraction</td>
            <td className="text-primary">{water_sat_before_gas_injection}</td>
            <td>
              {/* Water saturation after gas injection */}
              <input
                type="number"
                className="form-control form-control-sm"
                min="0"
                max={water_sat_before_gas_injection}
                step="0.01"
                value={water_sat_after_gas_injection}
                onChange={(e) =>
                  dispatch(setWaterSatAfterGasInjection(e.target.value))
                }
              />
            </td>
          </tr>
          <tr>
            <td>Irreducible Liquid Sat.</td>
            <td>fraction</td>
            <td>{irr_liquid_sat_before_gas_injection}</td>
            <td>{irr_liquid_sat_after_gas_injection}</td>
          </tr>
          <tr>
            <td>Oil Swelling Factor</td>
            <td>fraction</td>
            <td>
              <strong>-</strong>
            </td>
            <td>
              <input
                type="number"
                className="form-control form-control-sm"
                min="1.00"
                max="1.50"
                step="0.01"
                value={oil_swelling_factor}
                onChange={(e) => dispatch(setOilSwellingFactor(e.target.value))}
              />
            </td>
          </tr>
          <tr>
            <td>Water Sat. (Below Gas Level)</td>
            <td>fraction</td>
            <td>{water_sat_before_gas_injection}</td>
            <td>
              <input
                type="number"
                className="form-control form-control-sm"
                min="0.15"
                max="0.4"
                step="0.01"
                value={water_sat_below_gas_level_after_gas_injection}
                onChange={(e) =>
                  dispatch(
                    setWaterSatBelowGasLevelAfterGasInjection(e.target.value)
                  )
                }
              />
            </td>
          </tr>
          <tr>
            <td>Oil FVF (Bo)</td>
            <td>fraction</td>
            <td>{oil_fvf_before_gas_injection}</td>
            <td>
              <input
                type="number"
                className="form-control form-control-sm"
                min={oil_fvf_before_gas_injection}
                max="2"
                step="0.01"
                value={oil_fvf_after_gas_injection}
                onChange={(e) =>
                  dispatch(setOilFVFAfterGasInjection(e.target.value))
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <button type="submit" size="md" className="btn btn-outline-success">
          Run
        </button>
      </div>
    </>
  );
};

export default GravityInputs;
