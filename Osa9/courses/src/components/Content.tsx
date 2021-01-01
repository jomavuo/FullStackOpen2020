import React from 'react';
import { CoursePart } from '../index';
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <div>{props.courseParts.map(part =>
      <Part key={part.name} part={part} />
    )}
    </div>
  );
};

export default Content;