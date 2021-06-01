import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function Seat() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [ tableId, setTableId ] = useState(0);

  const loadTables = () => {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  };

  useEffect(loadTables, [tables]);

  const submitHandler = (event) => {
    event.preventDefault();
    const controller = new AbortController();
    updateTable(tableId, reservation_id, controller.signal)
    .then(()=> history.push("/"))
    .catch(setTablesError)
    return () => controller.abort()
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const changeHandler = event => {
    event.preventDefault();
    setTableId(event.target.value);
  }

  return (
    <div>
      <ErrorAlert error={tablesError} />
      <form onSubmit={submitHandler} onReset={cancelHandler}>
        <select name="table_id" class="form-select" aria-label="Select Table" id="table_id" onChange={changeHandler}>
          <option selected>Open this select menu</option>
          {tables.map((table) => {
            return (
              <option value={table.table_id}>
                {table.table_name} - {table.capacity}
              </option>
            );
          })}
        </select>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button type="reset" className="btn btn-primary">
          Cancel
        </button>
      </form>
    </div>
  );
}
