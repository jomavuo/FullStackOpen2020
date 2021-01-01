import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
import cors from 'cors';

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});


app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});