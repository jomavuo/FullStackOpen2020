import React from 'react';

const Course = ({ name, parts }) => {
    
    return (
        <>
            <Header title={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </>
    )
}

const Header = ({ title }) => {
    return (
        <>
            <h2>{title}</h2>
        </>
    )
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map((part) =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <>
            <p>{name} {exercises}</p>
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <>
            <p><strong>Total of {total} exercises</strong></p>
        </>
    )
}

export default Course