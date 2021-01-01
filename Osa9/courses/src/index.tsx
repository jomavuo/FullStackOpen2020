import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartBaseDescription extends CoursePartBase {
    description: string;
}

interface CoursePartOne extends CoursePartBaseDescription {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseDescription {
    name: "Added part four";
    teacher: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'));
