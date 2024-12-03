import { useState } from "react";
import axios from 'axios';

function Add() {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [developer, setDeveloper] = useState('');
  const [score, setScore] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(''); // State for error messages

  const handleScoreChange = (e) => {
    const value = e.target.value;
    // Allow only numeric input and values between 1 and 100
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setScore(value);
      setError(''); // Clear error if valid
    } else {
      setError('Score must be a number between 1 and 100.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation before submission
    if (!platform) {
      setError('Please select a valid platform.');
      return;
    }

    // Final validation before submission
    if (score < 1 || score > 100) {
      setError('Score must be between 1 and 100.');
      return;
    }

    console.log(`Title: ${title}, Platform: ${platform}, Developer: ${developer}, Score: ${score}, Image(URL): ${image}`);

    const game = {
      title,
      platform,
      developer,
      score,
      image
    };

    axios.post('http://localhost:4000/api/games', game)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
  };

  return (
    <div>
      <h2>This is my Add Component for Games.</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Add Game Title: </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* https://www.geeksforgeeks.org/how-to-get-selected-value-in-dropdown-list-using-javascript/ */}
          <label>What Platform:(Xbox, PS5, PC): </label>
          <select
            className="form-control"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="">Select Platform</option>
            <option value="Xbox">Xbox</option>
            <option value="PS5">PS5</option>
            <option value="PC">PC</option>
          </select>
          <label>Game Developer: </label>
          <input
            type="text"
            className="form-control"
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
          />
          <label>Review Score(1-100): </label>
          <input
            type="number" // Use number input for score
            className="form-control"
            value={score}
            onChange={handleScoreChange}
          />
          <label>Game Image: </label>
          <input type="text"
            className="form-control"
            value={image}
            onChange={(e) => { setImage(e.target.value) }}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error */}
        </div>
        <input type="submit" value="Add Game" />
      </form>
    </div>
  );
}

export default Add;
