import List from "../components/ui/list";
import NavBar from "../components/ui/navbar";
import Tools from "../components/ui/tools";
import type { JobsDataResponse } from "../types/jobs";

function Dashboard({ data }: { data: JobsDataResponse }) {
  return (
    <>
      <NavBar />
      <Tools />
      <List data={data} />
    </>
  );
}

export default Dashboard;
