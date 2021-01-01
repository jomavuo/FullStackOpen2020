/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { NewPatientEntry, Gender, Entry, BaseEntry, EntryType, HealthCheckRating } from './types';
import { v4 as uuid } from 'uuid';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }
  return specialist;
};

// const parseDiagnosisCodes = (code: any): string => {
//   if (!code || !isString(code)) {
//     throw new Error(`Incorrect or missing diagnosisCodes: ${code}`);
//   }
//   return code;
// };

const isEntry = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isAcceptedType = (type: any): EntryType => {
  if (!type || !isEntry(type)) {
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  return type;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing healthCheckRating: ${rating}`);
  }
  return rating;
};
const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error(`Incorrect or missing discharge-criteria: ${criteria}`);
  }
  return criteria;
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing employerName: ${name}`);
  }
  return name;
};

const parseId = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error(`Incorrect or missing id: ${id}`);
  }
  return id;
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
  };
};

const assertNever = (value: any): never => {
  throw new Error(`Unhandled entry-type: ${JSON.stringify(value)}`);
};

export const toNewEntry = (object: any): Entry => {
  const newId = uuid();

  if (!object.type || !isAcceptedType(object.type)) {
    throw new Error('Incorrect type');
  }

  const entry: BaseEntry = {
    id: parseId(newId),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: object.diagnosisCodes
  };

  switch (object.type) {
    case "Hospital":
      return {
        ...entry,
        type: "Hospital",
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseCriteria(object.discharge.criteria)
        }
      };

    case "OccupationalHealthcare":
      return {
        ...entry,
        type: "OccupationalHealthcare",
        employerName: parseEmployerName(object.employerName),
        sickLeave: {
          startDate: object.sickLeave.startDate,
          endDate: object.sickLeave.endDate
        }
      };

    // if (object.sickLeave) {
    //   entryObj.sickLeave = object.sickLeave;
    // }
    // return entryObj;

    case "HealthCheck":
      return {
        ...entry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };

    default:
      return assertNever(object.type);
  }
};