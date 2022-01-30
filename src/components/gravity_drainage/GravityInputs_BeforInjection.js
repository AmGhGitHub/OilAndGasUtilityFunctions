import { useSelector, useDispatch } from "react-redux";

import { setSoiAndSwiGZ, setSwiWZ } from "../../store/gravity-drainage-slice";

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
          <td>Oil Sat. (Gas Invading Zone)</td>
          <td>fraction</td>
          <td className="text-center">
            <input
              type="range"
              className="form-range"
              min="0.2"
              max="0.55"
              step="0.01"
              value={soi_gz}
              onChange={(e) => dispatch(setSoiAndSwiGZ(e.target.value))}
            />
          </td>
          <td className="text-center">{soi_gz}</td>
        </tr>
        <tr>
          <td>Water Sat. (Gas Invading Zone)</td>
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
          <td className="text-primary text-center">{swi_gz}</td>
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
              value={swi_wz}
              onChange={(e) => dispatch(setSwiWZ(e.target.value))}
            />
          </td>
          <td className="text-center">{swi_wz}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default GravityInputsBeforeInjection;
