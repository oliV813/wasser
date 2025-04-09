import { useEffect, useState } from "react"

const Total = () => {

    const [allData, setAllData] = useState()
    const [allDates, setAllDates] = useState()
    const [totalOfDay, setTotalOfDay] = useState()
    const [date, setDate] = useState()

    // Alle Daten bekommen ohne Duplikate
    const getAllDates = async () => {
        try {
            const response = await fetch('https://wasser.onrender.com/all')

            const result = await response.json()
            console.log(result)
            setAllData(result)

            // duplikate entfernen
            const arr = []
            result.map( (item, index) => {
                if(!arr.includes(item.edate)) {

                    arr.push(item.edate)
                    
                }
            } )

            console.log(arr)
            setAllDates(arr)

        }


        catch(err) {
            console.log(err)
        }
    }

    // Totalen wert von bestimmten datum bekommen
    const totalDay = (date) => {
        setDate(date)
        console.log(date)
        setTotalOfDay(0)

        const filtered = allData.filter(item => item.edate == date)
        console.log(filtered)
        let sum = 0

        filtered.map( (item, index) => {
           
            sum = sum + parseFloat(item.amount)
        } )

        setTotalOfDay(sum)

    }

    useEffect( () => {
        getAllDates()
    }, [] )


    return (
        <div className="appTotal">
            <div className="c">

            
            {allDates && allDates.map( (item, index) =>  (
                <div className="btn2" onClick={()=>totalDay(item)} key={index}>
                    <p>{item.split("T")[0]}</p>
                </div>
            ))}
            </div>
          

            {date && <div className="total">
                <p>{date.split('T')[0]}</p>
            <p className="count">{totalOfDay} L</p>
            </div>}
           
        </div>
    )


}


export default Total