import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewReservation() {
  const defaultReservationData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };
  const [reservationData, setReservationData] = useState({
    ...defaultReservationData,
  });
  const [createResError, setResError] = useState(null);
  const [buttonDisable, setButtonDisable] = useState(false);
  const history = useHistory();

  const changeHandler = (event) => {
    event.preventDefault();
    setReservationData({
      ...reservationData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const controller = new AbortController();
    setButtonDisable((state) => !state);
    createReservation(reservationData, controller.signal) //THIS WORKS !!! WOOO  
    .catch(setResError);
    setButtonDisable((state) => !state);
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    setButtonDisable((state) => !state);
    history.goBack();
  };

  return (
    <div>
      <ErrorAlert error={createResError} />
      <form onSubmit={submitHandler} onReset={cancelHandler}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            class="form-control"
            name="first_name"
            id="first_name"
            placeholder="First Name"
            value={reservationData.first_name}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            id="last_name"
            placeholder="Last Name"
            value={reservationData.last_name}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            name="mobile_number"
            id="mobile_number"
            placeholder="Mobile Number"
            value={reservationData.mobile_number}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservation_date">Reservation Date</label>
          <input
            type="date"
            className="form-control"
            name="reservation_date"
            id="reservation_date"
            onFocus="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            value={reservationData.reservation_date}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservation_time">Reservation Time</label>
          <input
            type="time"
            min="10:30"
            max="21:30"
            className="form-control"
            name="reservation_time"
            id="reservation_time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            value={reservationData.reservation_time}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="people">Number of People</label>
          <input
            type="number"
            className="form-control"
            name="people"
            id="people"
            placeholder="Number of People"
            value={reservationData.people}
            onChange={changeHandler}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={buttonDisable}
        >
          Submit
        </button>
        <button
          type="reset"
          className="btn btn-primary"
          disabled={buttonDisable}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
