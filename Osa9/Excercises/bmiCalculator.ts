type BMI = string;

export const calculateBmi = (height: number, weight: number): BMI => {
  if (!isNaN(height) && !isNaN(weight)) {
    const heightInMetres = height / 100;
    const bmi = weight / (heightInMetres * heightInMetres);

    if (bmi <= 15) {
      return "Very severely underweight";
    } else if (bmi > 15 && bmi <= 16) {
      return "Severely underweight";
    } else if (bmi > 16 && bmi <= 18.5) {
      return "Underweight";
    } else if (bmi > 18.5 && bmi <= 25) {
      return "Normal (healthy weight)";
    } else if (bmi > 25 && bmi <= 30) {
      return "Overweight";
    } else if (bmi > 30 && bmi <= 35 ) {
      return "Obese Class I (Moderately obese)";
    } else if (bmi > 35 && bmi <= 40) {
      return "Obese Class II (Severely obese)";
    } else if (bmi > 40) {
      return "Obese Class III (Very severely obese)";
    } else {
      throw new Error('BMI out of scale');
    }
  } else {
    throw new Error('Provided values were not numbers!');
  } 
};



if (require.main === module) {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);

  try {
    console.log(calculateBmi(height, weight));
  } catch (e) {
    if (e instanceof Error) {
      console.log('Something went wrong, error message:', e.message);
    }
  }
}