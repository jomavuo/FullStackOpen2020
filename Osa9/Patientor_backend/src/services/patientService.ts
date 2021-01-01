import patientData from '../../data/patientData';
import {
  Patient, PublicPatient, NewPatientEntry, Entry, BaseEntry, OccupationalHealthcareEntry, HospitalEntry, HealthCheckEntry } from '../types';

import { v4 as uuid } from 'uuid';

const patients: Array<Patient> = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getEntryType = (entry: Entry): Entry | undefined => {
  switch (entry.type) {
    case "Hospital":
      return entry;
    case "OccupationalHealthcare":
      return entry;
    case "HealthCheck":
      return entry;
    default:
      return undefined;
  }
};

const findPatient = (id: string): Patient | undefined => {

  const patientFound: Patient | undefined = patients.find(patient => patient.id === id);
  const patientsEntrytypes = patientFound?.entries.map((entry: Entry) => getEntryType(entry));

  if (patientFound && patientsEntrytypes) {
    const returnedPatient: Patient = {
      id: patientFound.id,
      name: patientFound.name,
      ssn: patientFound.ssn,
      occupation: patientFound.occupation,
      dateOfBirth: patientFound.dateOfBirth,
      gender: patientFound.gender,
      entries: patientFound.entries
    };
    return returnedPatient;

  } else {
    throw new Error("patient not found");
  }
};

const addEntry = (id: string, entry: Entry): Patient | undefined => {
  const patientFound: Patient | undefined = patients.find(patient => patient.id === id);

  if (patientFound) {
    const baseEntry: BaseEntry = {
      id: entry.id,
      description: entry.description,
      date: entry.date,
      specialist: entry.specialist,
      diagnosisCodes: entry.diagnosisCodes
    };


    switch (entry.type) {
      case "Hospital":
        const hospitalEntry: HospitalEntry = {
          ...baseEntry,
          type: entry.type,
          discharge: {
            date: entry.discharge.date,
            criteria: entry.discharge.criteria
          }
        };
        patientFound.entries.push(hospitalEntry);
        return patientFound;

      case "OccupationalHealthcare":
        const occupationalHCEntry: OccupationalHealthcareEntry = {
          ...baseEntry,
          type: entry.type,
          employerName: entry.employerName
        };

        if (entry.sickLeave) {
          occupationalHCEntry.sickLeave = {
            startDate: entry.sickLeave.startDate,
            endDate: entry.sickLeave.endDate
          };
        }
        patientFound.entries.push(occupationalHCEntry);
        return patientFound;

      case "HealthCheck":
        const healthCheckEntry: HealthCheckEntry = {
          ...baseEntry,
          type: entry.type,
          healthCheckRating: entry.healthCheckRating
        };
        patientFound.entries.push(healthCheckEntry);
        return patientFound;

      default:
        return undefined;
    }
  } else {
    throw new Error("patient not found");
  }
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatientEntries,
  findPatient,
  getEntryType,
  addEntry
};