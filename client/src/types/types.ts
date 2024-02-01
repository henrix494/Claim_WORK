export interface inputTypes {
  id: string;
  firstName: string;
  lastName: string;
  county: string;
  city: string;
  street: string;
  zipcode: string;
  phone: string;
  email: string;

  [key: string]: string | undefined;
}
