export interface CreatePersonDto {
    name: string;
    email: string;
    birth_date?: string;
  }
  
  export interface UpdatePersonDto {
    name?: string;
    email?: string;
    birth_date?: string | null;
  }
  