import React from 'react';
import { CourseParts } from '../types';

interface TotalProps {
  courseParts: Array<CourseParts>
}

const Total: React.FC<TotalProps> = (props) => {
  return (
    <div>
      <h3>Number of exercises:{" "} {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</h3>
    </div>
  );
};

export default Total;