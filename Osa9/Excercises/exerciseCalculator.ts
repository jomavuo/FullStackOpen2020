interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Arguments {
  targetValue: number,
  trainingValues: Array<number>
}

const getRating = (average: number, target: number) => {
  if (average >= 0 && average < 1) {
    return 1;
  } else if (average >= 1 && average <= target) {
    return 2;
  } else {
    return 3;
  }
};

const getRatingDescription = (rating: number) => {
  switch(rating) {
  case 1:
    return "bad";
  case 2:
    return "not too bad, but could be better";
  case 3:
    return "excellent!";
  default:
    throw new Error('Rating is not defined!');
  }
};

const parseArguments = (args: Array<string>): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const exercisesArray: Array<number> = [];

  for (let i=3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      exercisesArray.push(Number(args[i]));
    } else {
      throw new Error('Provided values were not numbers');
    }
  }

  if (isNaN(Number(args[2]))) {
    throw new Error('Provided values were not numbers');
  } else {
    return { targetValue: Number(args[2]), trainingValues: exercisesArray };
  }
};

export const calculateExercises = (dailyHours: Array<number>, originalTarget: number) : Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(value => value !== 0).length;
  const average = dailyHours.reduce((value1, value2) => (value1 + value2)) / periodLength;

  let success = false;
  if (average >= originalTarget) {
    success = true;
  }
  
  const rating = getRating(average, originalTarget);
  const ratingDescription = getRatingDescription(rating);

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: originalTarget,
    average: average
  };
};


if (require.main === module) {
  try {
    const { targetValue, trainingValues } = parseArguments(process.argv);
    console.log(calculateExercises(trainingValues, targetValue));
  } catch (e) {
    if (e instanceof Error) {
      console.log('Error, something bad happened, sorry! Message:', e.message);
    }
  }
}
