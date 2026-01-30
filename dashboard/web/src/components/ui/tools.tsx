import "../../styles/components/tools.scss"
import RefreshIcon from "../icons/refresh";
import SearchIcon from "../icons/search";


function Tools() {
  return (
    <div id="tools">
      <div id="refresh-btn">
        <RefreshIcon />
        <div>Refresh</div>
      </div>
      <div id="search-bar">
        <SearchIcon />
        <input type="text" placeholder="Search"></input>
      </div>
    </div>
  )
}

export default Tools;