export interface Collaborator {
  collaboratorId:    number;
  name:              string;
  surname:           string;
  phone:             string;
  address:           string;
  email:             string;
  nameContact:       string;
  phoneContact:      string;
  genderId:          number;
  genderDescription: string;
  color:             string;
  services:          Service[];
}

export interface Service {
  serviceId:    number;
  serviceTitle: string;
  percentage:   number;
}
