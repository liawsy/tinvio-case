import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Loader from './Loader';

function PostCard() {

    const [loading, setLoading] = useState(true);
    const [postCount, setPostCount] = useState(0);
    const [posts, setPosts] = useState([]);
    const [name, setName] = useState("");

    async function getName() {
      try {
        const result = await Axios.get(
          `https://jsonplaceholder.typicode.com/users/1`,
        );
        const {name} = result.data;
        setName(name.split(" ")[0]);
      } catch (error) {
        console.log(error);
        console.log('Unable to load data');
      }
    }

    async function getPosts() {
        try {
            const result = await Axios.get(
              `https://jsonplaceholder.typicode.com/posts?userId=1`,
            );
            console.log(result.data);
            setPostCount(result.data.length);
            setPosts(result.data);
            await getName();
            if (loading) {
              setLoading(false);
            }

          } catch (error) {
            console.log(error);
            console.log('Unable to load data');
          }
    }

    function renderPost(post) {
        const {title, body, id} = post;
        return (
            <div className="post-box" key={id}>
                <p className="post-title"><b>{capitaliseLetters(title)}</b></p>
                <p className="post-desc">{body}</p>
            </div>
        );
    }

    function capitaliseLetters(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        getPosts();
    }, []);

    
    return (
      <div>{loading ? <Loader /> :
      <div className="card">
        <div className="card-container">
          <h4>{name}'s Posts</h4>
          <p className="subtext">{postCount} POSTS</p>
          <div className="posts-container">
            {posts.map((post) => renderPost(post))}
          </div>
        </div>
      </div>}</div>
    );
  }
  
  export default PostCard;
  