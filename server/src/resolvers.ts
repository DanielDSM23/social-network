const doctorsData = [
    {
      name: 'Samia Mekame',
      speciality: 'OPHTALMOLOGIST',
    },
    {
      name: 'Catherine Bedoy',
      speciality: 'PSYCHOLOGIST',
    },
  ];
export const resolvers = {
    Query: {
        doctors: () => doctorsData,
      },
}