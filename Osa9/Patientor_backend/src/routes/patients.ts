import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.post('/', (_req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(_req.body);

    const addedPatientEntry = patientService.addPatient(newPatientEntry);
    res.json(addedPatientEntry);

  } catch (e) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

router.post('/:id/entries', (_req, res) => {

  try {
    const patientId = _req.params.id;

    const newEntryDetails = toNewEntry(_req.body);
    const patientWithAddedEntry = patientService.addEntry(patientId, newEntryDetails);
    res.json(patientWithAddedEntry);

  } catch (e) {
    if (e instanceof Error) {
      res.status(404).send(e.message);
    }
  }
});

router.get('/:id', (_req, res) => {
  const id = _req.params.id;
  const patient = patientService.findPatient(id);
  res.json(patient);
});

export default router;