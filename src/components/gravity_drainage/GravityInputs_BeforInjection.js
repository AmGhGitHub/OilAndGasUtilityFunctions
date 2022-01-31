import { useSelector, useDispatch } from "react-redux";

import {
  setSoiAndSwiGZ,
  setSwiWZ,
  setOilAndGasLevels,
} from "../../store/gravity-drainage-slice";

const GravityInputsBeforeInjection = () => {
  const { soi_gz, swi_gz, swi_wz } = useSelector(
    (state) => state.gravityDrainage
  );
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
          <td>Soi (Gas Invading Zone)</td>
          <td>%</td>
          <td className="text-center">
            <input
              type="range"
              className="form-range"
              min="20"
              max="55"
              value={soi_gz}
              onChange={(e) => {
                dispatch(setSoiAndSwiGZ(e.target.value));
              }}
              onMouseUp={() => dispatch(setOilAndGasLevels())}
            />
          </td>
          <td className="text-center">{soi_gz}</td>
        </tr>
        <tr>
          <td>Swi (Gas Invading Zone)</td>
          <td>fraction</td>
          <td>
            <input type="range" className="form-range" value="0" disabled />
          </td>
          <td className="text-primary text-center">{swi_gz}</td>
        </tr>

        <tr>
          <td>Oil Swelling Factor</td>
          <td>%</td>
          <td>
            <input type="range" className="form-range" value="0" disabled />
          </td>
          <td className="text-center">1.00</td>
        </tr>
        <tr>
          <td>Swi (Below Gas Level)</td>
          <td>%</td>
          <td>
            <input
              type="range"
              className="form-range"
              min="15"
              max="53"
              value={swi_wz}
              onChange={(e) => {
                dispatch(setSwiWZ(e.target.value));
              }}
              onMouseUp={() => dispatch(setOilAndGasLevels())}
            />
          </td>
          <td className="text-center">{swi_wz}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default GravityInputsBeforeInjection;
