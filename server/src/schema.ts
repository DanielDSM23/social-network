import gql from "graphql-tag";
 
export const typeDefs = gql`
type Doctor {
  name: String
  speciality: Speciality
}

enum Speciality {
  PSYCHOLOGIST
  OPHTALMOLOGIST
}
type Query {
   doctors: [Doctor]
 }
`;