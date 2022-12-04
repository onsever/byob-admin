import { Provider } from "react-redux";
import { store } from "./redux/store";
import RootNavigator from "./navigators/RootNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
