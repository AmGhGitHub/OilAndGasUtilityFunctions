import GravityGraph from "./GravityGraph";
import GravityInputs from "./GarvityInputs";
import InjectionSepcs from "./InjectionSepcs";
import GravityLogo from "./GravityLogo";

const Gravity = () => {
  return (
    <>
      <GravityLogo />
      <InjectionSepcs />
      <GravityInputs />

      <div className="row">
        <GravityGraph />
      </div>
    </>
  );
};

export default Gravity;
