import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
    <>
    <button onClick={props.onClick}> {props.text}</button>
    </>
)

const Statistics = (props) => {
    console.log(props)
    
    const all = props.all
    const average = (props.good * 1 + props.neutral * 0 + props.bad * -1) / all;
    const positive = props.good / all * 100;

    if (all !== 0) {
        return (
            <>
                <table>
                    <StatisticLine text="good" value={props.good} />
                    <StatisticLine text="neutral" value={props.neutral} />
                    <StatisticLine text="bad" value={props.bad} />
                    <StatisticLine text="all" value={all} />
                    <StatisticLine text="average" value={average} />
                    <StatisticLine text="positive" value={positive + ' %'} />
                </table>
            </>
        )
    } else {
        return (
            <>
                <p>No feedback given</p>
            </>
        )
    }
}

const StatisticLine = (props) => {
    return (
        <>
        <tbody>
            <tr>
                <td>{props.text}</td>
                <td>{props.value}</td>
            </tr>
        </tbody>
        </>
    )
}



const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [allClicks, setAllClicks] = useState(0);

    const handleClickGood = () => {
        setAllClicks(allClicks +1)
        setGood(good + 1)
    }

    const handleClickNeutral = () => {
        setAllClicks(allClicks +1)
        setNeutral(neutral + 1)
    }

    const handleClickBad = () => {
        setAllClicks(allClicks +1)
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleClickGood} text="good" />
            <Button onClick={handleClickNeutral} text="neutral" />
            <Button onClick={handleClickBad} text="bad" />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} all={allClicks}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
