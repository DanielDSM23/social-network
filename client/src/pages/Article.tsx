import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';

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
        userId
        createdAt
      }
    }
  }
`;

const LIKE_TWEET = gql`
  mutation LikeTweet($tweetId: ID!) {
    likeTweet(tweetId: $tweetId) {
      response {
        code
        message
        success
      }
      like {
        userId
        tweetId
      }
    }
  }
`;

const COMMENT_TWEET = gql`
  mutation CommentTweet($tweetId: ID!, $content: String!) {
    commentTweet(tweetId: $tweetId, content: $content) {
      response {
        code
        message
        success
      }
      comment {
        id
        content
        userId
        createdAt
      }
    }
  }
`;

const DELETE_TWEET = gql`
  mutation DeleteTweet($id: String!) {
    deleteTweet(id: $id) {
      code
      message
      success
    }
  }
`;

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(GET_TWEET_BY_ID, {
    variables: { id },
  });

  const [likeTweet] = useMutation(LIKE_TWEET);
  const [commentTweet] = useMutation(COMMENT_TWEET);
  const [deleteTweet] = useMutation(DELETE_TWEET);

  const [newComment, setNewComment] = useState('');
  const loggedInUserId = localStorage.getItem('userId'); 

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const tweet = data.getTweetByTweetId;

  const handleLike = async () => {
    try {
      const response = await likeTweet({
        variables: { tweetId: tweet.id },
      });

      if (response.data.likeTweet.response.success) {
        alert('Vous avez liké ce tweet.');
        refetch(); 
      } else {
        alert('Impossible de liker ce tweet.');
      }
    } catch (e) {
      console.error('Erreur lors du like :', e);
    }
  };

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await commentTweet({
        variables: {
          tweetId: tweet.id,
          content: newComment,
        },
      });

      if (response.data.commentTweet.response.success) {
        alert('Votre commentaire a été ajouté.');
        setNewComment('');
        refetch(); 
      } else {
        alert('Impossible d\'ajouter le commentaire.');
      }
    } catch (e) {
      console.error('Erreur lors de l\'ajout du commentaire :', e);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteTweet({
        variables: { id: tweet.id },
      });
      console.log(response.data)

      if (response.data.deleteTweet.success) {
        alert('Le tweet a été supprimé avec succès.');
        navigate('/'); 
      } else {
        alert('Impossible de supprimer ce tweet.');
      }
    } catch (e) {
      console.error('Erreur lors de la suppression du tweet :', e);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-2">{`Tweet de l'utilisateur ${tweet.userId}`}</h1>
      <p className="mb-4">{tweet.content}</p>
      <div className="mb-4">
        <button onClick={handleLike} className="bg-blue-500 text-white px-4 py-2 rounded">
          Like ({tweet.likes ? tweet.likes.length : 0})
        </button>
        {/* {loggedInUserId === tweet.userId && ( */}
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded ml-4"
          >
            Supprimer
          </button>
        {/* )} */}
      </div>
      <div>
        <h2 className="text-xl font-bold">Commentaires</h2>
        {tweet.comments && tweet.comments.length > 0 ? (
          <ul>
            {tweet.comments.map((comment: any) => (
              <li key={comment.id} className="border-b py-2">
                <p className="font-bold">Utilisateur : {comment.userId}</p>
                <p>{comment.content}</p>
                <p className="text-gray-500 text-sm">
                {new Date(Number(comment.createdAt)).toLocaleString('fr-FR', {
                                
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </p>
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
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
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
