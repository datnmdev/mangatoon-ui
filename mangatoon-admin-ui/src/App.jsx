import { useSelector } from "react-redux";
import "./App.css";
import Spinner from "./components/Spinner";
import Router from "./routers";
import { loaderSelectors } from "./features/loader/loaderSlice";

export default function App() {
  const isLoading = useSelector(loaderSelectors.selectPageLoaderVisible)

  return (
    <div>
      <Router />

      {isLoading
        ? (
          <div className="fixed top-0 left-0 w-full h-[100vh] z-50">
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(245,241,241,0.6)]"></div>
            <div className="h-full flex justify-center items-center">
              <Spinner />
            </div>
          </div>
        ) 
        : null}

    </div>
  )
}
