import "../../styles/components/list.scss";
import { getTimeZone, toApproxUnit } from "../../utils/time";
import type { JobsDataResponse } from "../../types/jobs";

function List({ data }: { data: JobsDataResponse }) {
  function toLocalDateTime(date: string) {
    const dateTime = new Date(date.replace(" ", "T") + "Z");
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const dateTimeStr = `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString(undefined, options).toLocaleUpperCase()} (GMT${getTimeZone(dateTime)})`;

    return <td title={dateTimeStr}>{toApproxUnit(dateTime)} Ago</td>;
  }

  const generateTable = () => {
    if (data === null) {
      return;
    }

    if (data.result == false) {
      return;
    }

    return data.data.map((row) => (
      <tr>
        <td>
          <a href={row.url} target="_blank">
            {row.job_role}
          </a>
        </td>
        <td>{row.company}</td>
        {toLocalDateTime(row.added_at)}
      </tr>
    ));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Job Role</th>
          <th>Company</th>
          <th>Added</th>
        </tr>
      </thead>
      <tbody>{data && generateTable()}</tbody>
    </table>
  );
}

export default List;
