import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_TWEETS = gql`
  query GetAllTweets {
    getAllTweets {
      id
      content
      userId
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      username
    }
  }
`;

const Home: React.FC = () => {
  const { data, loading, error } = useQuery(GET_TWEETS);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Liste des tweets</h1>
      {data.getAllTweets.map((tweet: any) => (
        <Link to={`/article/${tweet.id}`} key={tweet.id} className="block mb-4">
          <div className="card hover:shadow-lg cursor-pointer">
            <h2 className="text-xl font-bold">{`Utilisateur : ${tweet.userId}`}</h2>
            <p>{tweet.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
