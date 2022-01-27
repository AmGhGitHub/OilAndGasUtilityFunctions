import GravityGraph from "./GravityGraph";
import GravityInputs from "./GravityInputs";

const Gravity = () => {
  return (
    <div className="container">
      <div className="row my-4">
        <h2 className="text-secondary">GRAVITY DRAINAGE</h2>
        <div className="col-lg">
          <h3 className="text-danger">Model Spec</h3>
          <GravityInputs />
        </div>
        <div className="col-lg">
          <GravityGraph />
        </div>
      </div>
    </div>
  );
};

export default Gravity;
