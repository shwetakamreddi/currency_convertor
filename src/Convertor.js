import React, { useState } from 'react'
import "./Convertor.css"

function Convertor() {
    const currencies = ["USD", "AED", " GBP", "CAD", "SGD", "EUR", "JPY", " PKR", " ZAR", "ALL"]
    const [amount, setAmount] = useState()
    const [convertTo, setConvertTo] = useState('')
    const [result, setResult] = useState()
    const [date, setDate] = useState('')

    const handleSelect = (e) => {
        const convertTo = e.target.value
        const tempAmount = amount
        setConvertTo(convertTo)
        fetch(`https://open.exchangerate-api.com/v6/latest/INR`)
            .then(response => response.json())
            .then(data => {
                setDate(data.time_last_update_utc)
                setResult((data.rates[convertTo] * tempAmount).toFixed(3))
            })
    }
    const handleInput = (e) => {
        setAmount(e.target.value)
    }


    return (
        <div className="card">
            <div className="info">
                <h5>{amount} Indian Rupee equals </h5>
                <h2>{result} {convertTo}</h2>
                <p>{date}</p>
            </div>
            <div className="card-body">
                <form>
                    <input type="number" value={amount} onChange={handleInput} />
                    <select>
                        <option>Indian Rupee</option>
                    </select>
                </form>
                <form>
                    <input type="number" value={result} />
                    <select name={convertTo} value={convertTo} onChange={handleSelect}>
                        {
                            currencies.map((currency) => (
                                <option value={currency} key={currency}>{currency}</option>
                            ))
                        }
                    </select>
                </form>
            </div>
        </div>
    )
}

export default Convertor
