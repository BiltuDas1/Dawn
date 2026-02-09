import { useJobsList } from "./hooks/useJobsList";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import "./styles/main.scss";

function App() {
  const { fetchJobs, result } = useJobsList();

  return (
    <>
      {result ? (
        result.result ? (
          <Dashboard data={result} />
        ) : (
          <Login callback={fetchJobs} response={result} />
        )
      ) : (
        <Login callback={fetchJobs} response={result} />
      )}
    </>
  );
}

export default App;
