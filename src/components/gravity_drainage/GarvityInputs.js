import GravityInputsBeforeInjection from "./GravityInputs_BeforInjection";
import GravityInputsAfterInjection from "./GravityInputs_AfterInjection";
import RunModel from "./RunModel";
const GarvityInputs = () => {
  return (
    <section className="mt-4">
      <div className="container border">
        <h4 className="mb-3">Saturation Changes</h4>
        <div className="row mt-3">
          <div className="col-md-6">
            <h5 className="text-primary">Before Gas Injection</h5>
            <GravityInputsBeforeInjection />
          </div>
          <div className="col-md-6">
            <h5 className="text-primary">After Gas Injection</h5>
            <GravityInputsAfterInjection />
          </div>
        </div>
        <div className="row mb-2">
          <div className="d-flex justify-content-end">
            <RunModel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GarvityInputs;
