
import { Person } from "./person";


export type GetPersonsResponse = Person[];

export interface CreatePersonResponse extends Person {}

export type UpdatePersonResponse = Person;

export interface DeletePersonResponse {
  success?: boolean;
}
