import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import AppRouter from "./pages/AppRouter";

export default function App() {
  return (
    <>
      <RecoilRoot>
        <AppRouter />
      </RecoilRoot>
    </>
  );
}
