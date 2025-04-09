import { useEffect, useState } from "react";

const Today = () => {

    const [count, setCount] = useState(0)
    const [countToday, setCountToday] = useState(0)

    const getTodayTotal = async () => {
        const response = await fetch('http://localhost:3001/today')
        const result = await response.json()
        let sum = 0
        result.map((item, index) => {
            sum = sum + parseFloat(item.amount)
            console.log("SUMME", sum)
            
        })
        setCountToday(sum)
    }

    const increase = () => {
        setCount(prev => parseFloat((prev + 0.1).toFixed(1)));

    }

    const decrease = () => {
        if (count > 0) {
            setCount(prev => parseFloat((prev - 0.1).toFixed(1)))
        }

    }

    const submit = async () => {
        console.log('Amount: ', count)

        try {
           const response = await fetch('http://localhost:3001/submit', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({count: count})
           })

           const result = await response.json()
           console.log(result)
           setCount(0)
           getTodayTotal()
        }

        catch(err) {
            console.log(err)
        }


    }

    // useEffect
    useEffect( ()=> {
        getTodayTotal()
    },[] )

    return (
        <div className='app'>

          

            {/* Container um Menge hinzufugen */}
            <div className='add'>
                <p className='change' onClick={decrease}>-</p>
                <p className='count'>{count.toFixed(1)} L</p>
                <p className='change' onClick={increase}>+</p>
            </div>

            <div>
                <button onClick={submit} className='btn'>Submit</button>
            </div>

            <div>
                <p className='count'>Today: {countToday} L</p>
            </div>




        </div>
    )

}


export default Today