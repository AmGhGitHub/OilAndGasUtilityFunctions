import Gravity from "./components/gravity_drainage/Gravity";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Gravity />
    </Provider>
  );
}

export default App;
