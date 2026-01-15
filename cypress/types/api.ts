
import { Person } from "./person";
import { CreatePersonDto, UpdatePersonDto } from "./person.dto";

export type GetPersonsResponse = Person[];

export interface CreatePersonResponse extends Person {}

export type UpdatePersonResponse = Person;

export interface DeletePersonResponse {
  success?: boolean;
}
