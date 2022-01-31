import { useSelector, useDispatch } from "react-redux";

import {
  setSorGZ,
  setSwrGZ,
  setOilSF,
  setSwrWZ,
} from "../../store/gravity-drainage-slice";
import { setOilAndGasLevels } from "../../store/gravity-drainage-slice";

import { fixedDecimalNumber } from "../../util/numberUtility";

const GravityInputsAfterInjection = () => {
  const { sor_gz, swr_gz, oil_sf, swr_wz } = useSelector(
    (state) => state.gravityDrainage
  );

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
            <td>Sorg (Gas Invaded Zone)</td>
            <td>%</td>
            <td>
              <input
                type="range"
                className="form-range"
                min="8"
                max="55"
                value={sor_gz}
                onChange={(e) => {
                  dispatch(setSorGZ(e.target.value));
                }}
                onMouseUp={() => dispatch(setOilAndGasLevels())}
              />
            </td>
            <td className="text-center">{sor_gz}</td>
          </tr>
          <tr>
            <td>Swrg (Gas Invaded Zone)</td>
            <td>%</td>
            <td>
              <input
                type="range"
                min="15"
                max="50"
                value={swr_gz}
                className="form-range"
                onChange={(e) => {
                  dispatch(setSwrGZ(e.target.value));
                }}
                onMouseUp={() => dispatch(setOilAndGasLevels())}
              />
            </td>
            <td className="text-center">{swr_gz}</td>
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
                value={oil_sf}
                onChange={(e) => {
                  dispatch(setOilSF(e.target.value));
                }}
                onMouseUp={() => dispatch(setOilAndGasLevels())}
              />
            </td>
            <td className="text-center">{fixedDecimalNumber(oil_sf, 2)}</td>
          </tr>
          <tr>
            <td>Swr (Below Gas Level)</td>
            <td>%</td>
            <td>
              <input
                type="range"
                className="form-range"
                min="15"
                max="40"
                value={swr_wz}
                onChange={(e) => {
                  dispatch(setSwrWZ(e.target.value));
                }}
                onMouseUp={() => dispatch(setOilAndGasLevels())}
              />
            </td>
            <td className="text-center"> {swr_wz}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default GravityInputsAfterInjection;
