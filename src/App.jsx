import React, { useState } from 'react';
import './App.css';

const BlogPost = ({ title, content, onAddComment }) => (
  <div className="blog-post">
    <h2>{title}</h2>
    <p>{content}</p>
    <CommentInput onAddComment={onAddComment} />
  </div>
);

const CommentList = ({ comments, onAddComment, parentId = null }) => {
  const nestedComments = comments
    .filter(comment => comment.parentId === parentId)
    .map(comment => (
      <li key={comment.id}>
        {comment.content}
        <CommentInput onAddComment={onAddComment} parentId={comment.id} />
        <ul>
          <CommentList comments={comments} parentId={comment.id} onAddComment={onAddComment} />
        </ul>
      </li>
    ));

  return <ul>{nestedComments}</ul>;
};

const CommentInput = ({ onAddComment, parentId = null }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim().length >= 200) {
      console.log(parentId, 'PARENTID')
      onAddComment(comment.trim(), parentId);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter the comment"
      />
      <button type="submit" disabled={comment.trim().length < 200}>
        Submit
      </button>
    </form>
  );
};

export default function App() {
  const [comments, setComments] = useState([
    {
      id: 1,
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      parentId: null 
    },
    {
      id: 2,
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      parentId: 1 
    },
    {
      id: 3,
      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      parentId: 1 
    },
    {
      id: 4,
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      parentId: null 
    }
  ]);

  const handleAddComment = (newComment, parentId = null) => {
    setComments((prev) => [...prev, { id: comments.length + 1, content: newComment, parentId}]);
  };

  return (
    <div className="app">
      <BlogPost
        title="Lorem Ipsum"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        onAddComment={handleAddComment}
      />
      <ul className="comments">
        <h2>Comments ({comments.filter((comment) => !comment?.parentId)?.length})</h2>
        <CommentList comments={comments} onAddComment={handleAddComment} />
      </ul>
    </div>
  );
}
