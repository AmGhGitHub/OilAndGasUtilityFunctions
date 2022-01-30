import { useDispatch } from "react-redux";
import { setOilAndGasLevels } from "../../store/gravity-drainage-slice";

const RunModel = () => {
  const dispatch = useDispatch();
  return (
    <button
      type="submit"
      size="lg"
      className="btn btn-outline-success"
      onClick={() => dispatch(setOilAndGasLevels())}
    >
      Run
    </button>
  );
};

export default RunModel;
