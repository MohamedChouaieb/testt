import React from 'react'

function Reservation({reservation}) {
  return (
    <>
    {reservation.map((rev)=>(
        <div key={rev.id}>
            <ul>
                <li>Type :{rev.type} </li>
                <li>go_date :{rev.go_date} </li>
                <li>return_date :{rev.return_date} </li>
                <li>destination :{rev.destination} </li>
                <li>price :{rev.price} </li>
                <li>capacite :{rev.capacite} </li>
            </ul>
        </div>
    ))}
    </>
  )
}

export default Reservation
