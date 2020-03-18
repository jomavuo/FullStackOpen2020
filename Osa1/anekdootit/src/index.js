import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
    return (
        <>
        <button onClick={props.onClick}> {props.text}</button>
        </>
    )
}

const Anecdote = (props) => {
    return (
        <>
        <h1>{props.title}</h1>
        <p>{props.randomized}</p>
        <p>has {props.points} votes</p>
        </>
    )
}

const Statistics = (props) => {
    const index = props.points.indexOf(Math.max(...props.points));
    const mostVoted = props.anecdotes[index]
    const points = Math.max(...props.points)
    return (
        <>
        <h1>{props.title}</h1>
        <p>{mostVoted}</p>
        <p>has {points} votes!</p>
        </>
    )
}
const App = (props) => {
    const arrayLength = props.anecdotes.length;

    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Array(arrayLength).fill(0))
    
    const handleNextClick = () => {
        const randomIndex = Math.floor(Math.random() * arrayLength)
        setSelected(randomIndex)
    }

    const handleVote = () => {
        const votedIndex = selected
        const copyArray = [...points]
        copyArray[votedIndex] +=1
        setPoints(copyArray)
    }

    return (
        <div>
            <Anecdote title="Anecdote of the day" randomized={props.anecdotes[selected]}
            points={points[selected]} />
            <Button onClick={handleVote} text="vote" />
            <Button onClick={handleNextClick} text="next anecdote" />
            <Statistics title="Anecdote with most votes" points = {points} anecdotes={props.anecdotes} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
);