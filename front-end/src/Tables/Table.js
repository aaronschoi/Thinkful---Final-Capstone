export default function Table({ tables }) {
    return(
        <table className='table'>
            <thead>
            <tr>
                <th scope='col'>Table Name</th>
                <th scope='col'>Status</th>
                <th scope='col'>Capacity</th>
                <th scope='col'></th>
            </tr>
            </thead>
            <tbody>
                {tables.map(({table_name, status, capacity}, index)=> {
                    return(
                        <tr key={index}>
                            <td>{table_name}</td>
                            <td>{status}</td>
                            <td>{capacity}</td>
                            <td>{status === "occupied" ? <button type="button" className="btn btn-primary">Finish</button> : null}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}