import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatThousandSeparator, formatGasBg } from "../../util/numberUtility";

import { setGasVol, setGasFVF } from "../../store/gravity-drainage-slice";
import { setVolumetricValues } from "../../store/gravity-drainage-slice";

const InjectionSepcs = () => {
  const [bgDev_pct, setBgDevPct] = useState(0);
  const { gas_vol, gas_bg } = useSelector((state) => state.gravityDrainage);

  const dispatch = useDispatch();

  return (
    <section className="mt-4">
      <div className="container border">
        <h4 className="mb-3">Gas Injection Specs</h4>
        <div className="row my-3">
          <div className="col-md-6">
            <h5 className="text-primary">Gas Volume (E6sm3)</h5>
            <div className="row">
              <div className="col-sm-10">
                <input
                  type="range"
                  min="0"
                  max="4000"
                  className="w-100"
                  value={gas_vol}
                  onChange={(e) => {
                    dispatch(setGasVol(e.target.value));
                    dispatch(setVolumetricValues());
                  }}
                  // onMouseUp={() => dispatch(setVolumetricValues())}
                />
              </div>
              <div className="col-sm-2">
                <h5>{formatThousandSeparator(gas_vol)}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h5 className="text-primary">Bg Dev. (Base: 3.852e-3 rm3/sm3)</h5>
            <div className="row">
              <div className="col-sm-10">
                <input
                  type="range"
                  min="-30"
                  max="30"
                  step="1"
                  className="w-100"
                  value={bgDev_pct}
                  onChange={(e) => {
                    setBgDevPct(e.target.value);
                    dispatch(setGasFVF(e.target.value));
                    dispatch(setVolumetricValues());
                  }}
                  // onMouseUp={() => dispatch(setVolumetricValues())}
                />
                <p className="text-danger">{formatGasBg(gas_bg)}e-3 rm3/sm3</p>
              </div>
              <div className="col-sm-2">
                <h5>{bgDev_pct}%</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InjectionSepcs;
