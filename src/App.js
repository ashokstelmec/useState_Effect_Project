import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchText, setSearchText] = useState("")
  
  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts")
     console.log(data);
      setPosts(data)
    }

    getPosts();

  }, [])

  const handleChange = (e) => {
    let text = e.target.value; //User typed value
    // In Object, to check deep values we use ? Operator otherwise javascript will throw error.
    // !! - Operator changes anything to boolean.
    const filteredContent = posts.filter(el => {
      if(el?.title?.includes(text)){
        return !!el;
      }
      return false;
    })
    if(text !== ""){
      setFilteredPosts(filteredContent)
    }
    setSearchText(e.target.value)
  }

  const handleClick = () => {
    setSearchText("")
  }

  const postList = posts.length > 0 && posts.map(el => (
    <div key={el.title} className="posts">
      <p>{el.title}</p>
    </div>
  ))

  const filteredPostList = filteredPosts.length > 0  && filteredPosts.map(el => (
    <div key={el.title} className="posts">
      <p>{el.title}</p>
    </div>
  ))

  return (
    <div className="App">
      <div>
        <input type="text" name="search" 
        value={searchText}
        onChange={handleChange}
        />
        <button onClick={handleClick}>Clear</button>
      </div>
      {/* {postList} */}
      {searchText === "" ? postList : filteredPostList}
    </div>
  );
}

export default App;

// postList - It is the array of objects coming directly from API.
// filteredPostList - It is the filtered array of objects.
// Filtering is done when we type each character in the input box.
// All the filtering is done on the API data but is saved in filteredPosts and is done in handleChange .