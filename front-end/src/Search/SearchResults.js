// export default function SearchResults({ results }) {
//     return(
//         <table className='table'>
//             <thead>
//             <tr>
//                 <th scope='col'>Table Name</th>
//                 <th scope='col'>Status</th>
//                 <th scope='col'>Capacity</th>
//             </tr>
//             </thead>
//             <tbody>
//                 {tables.map(({table_name, status, capacity}, index)=> {
//                     return(
//                         <tr key={index}>
//                             <td>{table_name}</td>
//                             <td>{status}</td>
//                             <td>{capacity}</td>
//                         </tr>
//                     )
//                 })}
//             </tbody>
//         </table>
//     )
// }