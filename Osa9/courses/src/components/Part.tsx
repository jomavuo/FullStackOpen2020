import React from 'react';
import { CoursePart } from '../index';

interface PartProps {
    part: CoursePart;
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part: React.FC<PartProps> = (props) => {
    switch (props.part.name) {
        case "Fundamentals":
            return (
                <div>
                    <h2>course: {props.part.name}</h2>
                    <p>exercises: {props.part.exerciseCount}</p>
                    <p>description: {props.part.description}</p>
                </div>
            );
        case "Using props to pass data":
            return (
                <div>
                    <h2>course: {props.part.name}</h2>
                    <p>exercises: {props.part.exerciseCount}</p>
                    <p>group project count: {props.part.groupProjectCount}</p>
                </div>
            );
        case "Deeper type usage":
            return (
                <div>
                    <h2>course: {props.part.name}</h2>
                    <p>exercises: {props.part.exerciseCount}</p>
                    <p>description: {props.part.description}</p>
                    <p>submission link: {props.part.exerciseSubmissionLink}</p>
                </div>
            );
        case "Added part four":
            return (
                <div>
                    <h2>course: {props.part.name}</h2>
                    <p>exercises: {props.part.exerciseCount}</p>
                    <p>description: {props.part.description}</p>
                    <p>teacher: {props.part.teacher}</p>
                </div>
            )
        default:
            return assertNever(props.part);
    }
};

export default Part;