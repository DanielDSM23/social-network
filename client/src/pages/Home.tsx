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
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

const TweetCard: React.FC<{ tweet: any }> = ({ tweet }) => {
  const isLoggedIn = !!localStorage.getItem('token'); 

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: tweet.userId },
    skip: !isLoggedIn, 
  });

  if (loading) return <p>Chargement de l'utilisateur...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <Link to={`/article/${tweet.id}`} className="block mb-4">
      <div className="card hover:shadow-lg cursor-pointer">
        <h2 className="text-xl font-bold">
          {data && data.getUserById
            ? `Utilisateur : ${data.getUserById.username}`
            : "Utilisateur non connecté"}
        </h2>
        <p>{tweet.content}</p>
      </div>
    </Link>
  );
};

export default Home;
