import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

interface ReqType {
  daily_exercises: Array<number>;
  target: number;
}

app.get("/hello", (_req, res) => {
  res.send("Hello from Full Stack");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  console.log(height, weight);

  if (!isNaN(height) && !isNaN(weight) && weight !== 0 && height !== 0) {
    const bmi: string = calculateBmi(height, weight);
    res.json({
      height: req.query.height,
      weight: req.query.weight,
      bmi: bmi,
    });
  } else {
    res.status(404).send({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  const body = req.body as ReqType;
  if (!body.daily_exercises || !body.target) {
    res.status(404).send({ error: "parameters missing" });
  } else {
    const dailyExercises: Array<number> = body.daily_exercises;
    const target: number = body.target;

    if (Array.isArray(dailyExercises) && !isNaN(target) && dailyExercises.length !== 0) {
      const valuesAreNumbers = dailyExercises.every((e) => typeof e === "number");

      if (valuesAreNumbers) {
        const result = calculateExercises(dailyExercises, target);
        res.json(result);

      } else {
        res.status(404).send({ error: "malformatted parameters" });
      }
    } else {
      res.status(404).send({ error: "malformatted parameters" });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
