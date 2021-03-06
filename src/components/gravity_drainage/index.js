import GravityGraph from "./GravityResults";
import GravityInputs from "./GarvityInputs";
import InjectionSepcs from "./InjectionSepcs";
import GravityLogo from "./GravityLogo";

const Gravity = () => {
  return (
    <>
      <GravityLogo />
      <InjectionSepcs />
      <GravityInputs />
      <GravityGraph />
    </>
  );
};

export default Gravity;
