import React, { useState, useEffect } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ id: "", title: "", body: "" });

  useEffect(() => {
    fetch("https://api.example.com/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (post.id) {
      fetch(`https://api.example.com/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then((response) => response.json())
        .then((data) => {
          const index = posts.findIndex((p) => p.id === data.id);
          const newPosts = [...posts];
          newPosts[index] = data;
          setPosts(newPosts);
          setPost({ id: "", title: "", body: "" });
        });
    } else {
      fetch("https://api.example.com/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then((response) => response.json())
        .then((data) => {
          setPosts([...posts, data]);
          setPost({ id: "", title: "", body: "" });
        });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleEdit = (post) => {
    setPost(post);
  };

  const handleDelete = (id) => {
    fetch(`https://api.example.com/api/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => setPosts(posts.filter((p) => p.id !== id)));
  };

  return (
    <div>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="id"
          value={post.id}
          onChange={handleChange}
        />
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="body">Body:</label>
        <textarea
          name="body"
          value={post.body}
          onChange={handleChange}></textarea>
        <br />
        <button type="submit">Save</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
