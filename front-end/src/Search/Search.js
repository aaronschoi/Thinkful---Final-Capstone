import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "../Reservations/Reservations";

export default function Search() {

    const [ mobile_phone, setMobile_phone ] = useState("")
    const [ data, setData ] = useState([]);
    const [ searchError, setSearchError ] = useState(null);
    const [ buttonDisable, setButtonDisable ] = useState(false);

    const findHandler = event => {
        event.preventDefault();
        if(mobile_phone !== ""){
        const controller = new AbortController()
        setButtonDisable(state => !state)
        listReservations({ mobile_phone }, controller.signal)
        .then(setData)
        .catch(setSearchError)
        setButtonDisable(state => !state);}
    }

  return (
    <div>
    <h1>Search</h1>
      <ErrorAlert error={searchError} />
      <form onSubmit={findHandler}>
        <div className="form-group">
          <input
            type="number"

            class="form-control"
            name="mobile_number"
            id="mobile_number"
            placeholder="Enter a customer's phone number"
            value={mobile_phone}
            onChange={event => setMobile_phone(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={buttonDisable}
        >
          Find
        </button>
      </form>
      {data.length > 0 ? <Reservation reservations={data} /> : <h3>No reservations found</h3>}
    </div>
  );
}
