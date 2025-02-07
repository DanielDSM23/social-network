import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_TWEETS = gql`
  query GetAllTweets {
    getAllTweets {
      id
      content
      userId
      createdAt
      likes {
        userId
      }
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
  const [filterByLikes, setFilterByLikes] = useState(false);
  const [filterByDate, setFilterByDate] = useState(false);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const tweets = [...data.getAllTweets];
  if (filterByLikes) {
    tweets.sort((a: any, b: any) => b.likes.length - a.likes.length);
  } else if (filterByDate) {
    tweets.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Liste des tweets</h1>
        <div>
          <button
            onClick={() => setFilterByLikes(!filterByLikes)}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            {filterByLikes ? 'Réinitialiser les likes' : 'Filtrer par likes'}
          </button>
          <button
            onClick={() => setFilterByDate(!filterByDate)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {filterByDate ? 'Réinitialiser la date' : 'Filtrer par date'}
          </button>
        </div>
      </div>
      {tweets.map((tweet: any) => (
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

  const formattedDate = new Date(Number(tweet.createdAt)).toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <Link to={`/article/${tweet.id}`} className="block mb-4">
      <div className="card hover:shadow-lg cursor-pointer">
        <h2 className="text-xl font-bold">
          {data && data.getUserById
            ? `Utilisateur : ${data.getUserById.username}`
            : 'Utilisateur non connecté'}
        </h2>
        <p>{tweet.content}</p>
        <p className="text-gray-500">Likes : {tweet.likes.length}</p>
        <p className="text-gray-500 text-sm">Créé le : {formattedDate}</p>
      </div>
    </Link>
  );
};

export default Home;
