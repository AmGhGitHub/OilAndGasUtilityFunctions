import { useSelector, useDispatch } from "react-redux";

import {
  setSorGZ,
  setSwrGZ,
  setOilSF,
  setSwrWZ,
  setOilAndGasLevels,
} from "../../store/gravity-drainage-slice";

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
            <td>Oil Sat. (Gas Invaded Zone)</td>
            <td>fraction</td>
            <td>
              <input
                type="range"
                className="form-range"
                min="0.05"
                max="0.5"
                step="0.01"
                value={sor_gz}
                onChange={(e) => dispatch(setSorGZ(e.target.value))}
              />
            </td>
            <td className="text-center">{sor_gz}</td>
          </tr>
          <tr>
            <td>Water Sat. (Gas Invaded Zone)</td>
            <td>fraction</td>
            <td>
              <input
                type="range"
                min="0.15"
                max="0.5"
                step=".01"
                value={swr_gz}
                className="form-range"
                onChange={(e) => dispatch(setSwrGZ(e.target.value))}
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
                onChange={(e) => dispatch(setOilSF(e.target.value))}
              />
            </td>
            <td className="text-center">{oil_sf}</td>
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
                value={swr_wz}
                onChange={(e) => dispatch(setSwrWZ(e.target.value))}
              />
            </td>
            <td className="text-center"> {swr_wz}</td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <button
          type="submit"
          size="md"
          className="btn btn-outline-success"
          onClick={() => dispatch(setOilAndGasLevels())}
        >
          Run
        </button>
      </div>
    </>
  );
};

export default GravityInputsAfterInjection;
