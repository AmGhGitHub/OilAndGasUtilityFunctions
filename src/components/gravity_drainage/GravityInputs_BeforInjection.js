import { useSelector, useDispatch } from "react-redux";

import {
  setOilAndWaterSatBeforeGasInjection,
  setWaterSatBelowGasLevelBeforeGasInjection,
} from "../../store/gravity-drainage-slice";

const GravityInputsBeforeInjection = () => {
  const {
    oil_sat_before_gas_injection,
    water_sat_before_gas_injection,
    water_sat_below_gas_level_before_gas_injection,
  } = useSelector((state) => state.gravityDrainage);

  const dispatch = useDispatch();

  return (
    <table className="table table-sm">
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
          <td className="text-center">
            <input
              type="range"
              className="form-range"
              min="0.2"
              max="0.55"
              step="0.01"
              value={oil_sat_before_gas_injection}
              onChange={(e) =>
                dispatch(setOilAndWaterSatBeforeGasInjection(e.target.value))
              }
            />
          </td>
          <td className="text-center">{oil_sat_before_gas_injection}</td>
        </tr>
        <tr>
          <td>Water Sat. (Gas Invaded Zone)</td>
          <td>fraction</td>
          <td>
            <input
              type="range"
              className="form-range"
              min="0"
              max="0.55"
              step="0.01"
              value="0"
              disabled
            />
          </td>
          <td className="text-primary text-center">
            {water_sat_before_gas_injection}
          </td>
        </tr>

        <tr>
          <td>Oil Swelling Factor</td>
          <td>fraction</td>
          <td>
            <input
              type="range"
              className="form-range"
              min="0"
              max="0.55"
              step="0.01"
              value="0"
              disabled
            />
          </td>
          <td className="text-center">1.0</td>
        </tr>
        <tr>
          <td>Water Sat. (Below Gas Level)</td>
          <td>fraction</td>
          <td>
            <input
              type="range"
              className="form-range"
              min="0"
              max="0.50"
              step="0.01"
              value={water_sat_below_gas_level_before_gas_injection}
              onChange={(e) =>
                dispatch(
                  setWaterSatBelowGasLevelBeforeGasInjection(e.target.value)
                )
              }
            />
          </td>
          <td className="text-center">
            {water_sat_below_gas_level_before_gas_injection}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default GravityInputsBeforeInjection;
