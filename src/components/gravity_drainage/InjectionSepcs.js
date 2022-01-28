import { useSelector, useDispatch } from "react-redux";
import { formatThousandSeparator } from "../../util/numberUtility";

import {
  setCumInjectedGasVolume,
  setGasFVF,
} from "../../store/gravity-drainage-slice";

const InjectionSepcs = () => {
  const { cum_injected_gas_volume, gas_fvf } = useSelector(
    (state) => state.gravityDrainage
  );

  const dispatch = useDispatch();

  return (
    <section className="mt-4">
      <div className="container border">
        <h4 className="mb-3">Gas Injection Specs</h4>
        <div className="row my-3">
          <div className="col-md-6">
            <h5 className="text-primary">Injected Volume (E6sm3)</h5>
            <div className="row">
              <div className="col-sm-10">
                <input
                  type="range"
                  min="0"
                  max="4000"
                  className="w-100"
                  value={cum_injected_gas_volume}
                  onChange={(e) =>
                    dispatch(setCumInjectedGasVolume(e.target.value))
                  }
                />
              </div>
              <div className="col-sm-2">
                <h5>{formatThousandSeparator(cum_injected_gas_volume)}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h5 className="text-primary">Gas FVF (rm3/sm3)</h5>
            <div className="row">
              <div className="col-sm-10">
                <input
                  type="range"
                  min="0"
                  max="0.03"
                  step="0.000001"
                  className="w-100"
                  value={gas_fvf}
                  onChange={(e) => dispatch(setGasFVF(e.target.value))}
                />
              </div>
              <div className="col-sm-2">
                <h5>{gas_fvf}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InjectionSepcs;
