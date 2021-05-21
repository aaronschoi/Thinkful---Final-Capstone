import React from 'react';

export default function Reservation( { reservations } ) {
    return (
        <table className='table'>
            <thead>
            <tr>
                <th scope='col'>First Name</th>
                <th scope='col'>Last Name</th>
                <th scope='col'>Mobile Number</th>
                <th scope='col'>Reservation Day</th>
                <th scope='col'>Reservation Time</th>
                <th scope='col'>Number of People</th>
            </tr>
            </thead>
            <tbody>
                {reservations.map(({first_name, last_name, mobile_number, reservation_date, reservation_time, people}, index)=> {
                    return(
                        <tr key={index}>
                            <td>{first_name}</td>
                            <td>{last_name}</td>
                            <td>{mobile_number}</td>
                            <td>{reservation_date}</td>
                            <td>{reservation_time}</td>
                            <td>{people}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        
    )
}