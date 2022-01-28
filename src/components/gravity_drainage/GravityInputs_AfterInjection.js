import { useSelector, useDispatch } from "react-redux";

import {
  setOilSatAfterGasInjection,
  setWaterSatAfterGasInjection,
  setOilSwellingFactor,
  setWaterSatBelowGasLevelAfterGasInjection,
  setLevelSeriesData,
} from "../../store/gravity-drainage-slice";

const GravityInputsAfterInjection = () => {
  const {
    oil_sat_after_gas_injection,
    water_sat_after_gas_injection,
    oil_swelling_factor,
    water_sat_below_gas_level_after_gas_injection,
  } = useSelector((state) => state.gravityDrainage);

  const dispatch = useDispatch();

  return (
    <>
      <table className="table table-sm mb-2">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Unit</th>
            <th colSpan="2" className="text-center">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Oil Sat. (Gas Invaded Zone)</td>
            <td>fraction</td>
            <td>
              <input
                type="range"
                className="form-range"
                min="0.1"
                max="0.5"
                step="0.01"
                onChange={(e) =>
                  dispatch(setOilSatAfterGasInjection(e.target.value))
                }
              />
            </td>
            <td className="text-center">{oil_sat_after_gas_injection}</td>
          </tr>
          <tr>
            <td>Water Sat. (Gas Invaded Zone)</td>
            <td>fraction</td>
            <td>
              <input
                type="range"
                min="0"
                max="0.5"
                step=".01"
                className="form-range"
                onChange={(e) =>
                  dispatch(setWaterSatAfterGasInjection(e.target.value))
                }
              />
            </td>
            <td className="text-center">{water_sat_after_gas_injection}</td>
          </tr>

          <tr>
            <td>Oil Swelling Factor</td>
            <td>fraction</td>
            <td>
              <input
                type="range"
                className="form-range"
                min="1"
                max="2"
                step="0.01"
                value={oil_swelling_factor}
                onChange={(e) => dispatch(setOilSwellingFactor(e.target.value))}
              />
            </td>
            <td className="text-center">{oil_swelling_factor}</td>
          </tr>
          <tr>
            <td>Water Sat. (Below Gas Level)</td>
            <td>fraction</td>
            <td>
              <input
                type="range"
                className="form-range"
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
            <td className="text-center">
              {water_sat_below_gas_level_after_gas_injection}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <button
          type="submit"
          size="md"
          className="btn btn-outline-success"
          onClick={() => dispatch(setLevelSeriesData())}
        >
          Run
        </button>
      </div>
    </>
  );
};

export default GravityInputsAfterInjection;
