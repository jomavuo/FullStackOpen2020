import React from 'react'
import Course from './components/Course'

const App = ({ courses }) => {

    return (
        <>
            <h1>Web development curriculum</h1>
            {courses.map((course) =>
                <Course key={course.id} name={course.name} parts={course.parts} />
            )}
        </>
    )

}

export default App