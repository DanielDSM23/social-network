import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_TWEET_BY_ID = gql`
  query GetTweetById($id: ID!) {
    getTweetByTweetId(id: $id) {
      id
      content
      userId
      likes {
        userId
        tweetId
      }
      comments {
        id
        content
      }
    }
  }
`;

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_TWEET_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const tweet = data.getTweetByTweetId;

  const handleLike = () => {
    alert('Vous avez liké cet article.');
  };

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Votre commentaire a été ajouté.');
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-2">{`Tweet de l'utilisateur ${tweet.userId}`}</h1>
      <p className="mb-4">{tweet.content}</p>
      <div className="mb-4">
        <button onClick={handleLike} className="bg-blue-500 text-white px-4 py-2 rounded">
          Like ({tweet.likes ? tweet.likes.length : 0})
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold">Commentaires</h2>
        {tweet.comments && tweet.comments.length > 0 ? (
          <ul>
            {tweet.comments.map((comment: any) => (
              <li key={comment.id} className="border-b py-2">
                <p>{comment.content}</p>
                {/* Supposons que l'utilisateur ne soit pas inclus dans le commentaire */}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun commentaire pour cet article.</p>
        )}
      </div>
      <form onSubmit={handleAddComment} className="mt-4">
        <textarea
          placeholder="Ajoutez un commentaire..."
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
          Ajouter un commentaire
        </button>
      </form>
    </div>
  );
};

export default Article;
