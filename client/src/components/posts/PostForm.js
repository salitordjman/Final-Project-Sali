import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  return (
    <div>
      <div>
        <h3>Write a post</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText("");
        }}
      >
        <div>
          <textarea
            className="post-textarea"
            name="text"
            rows="3"
            placeholder="Create a post"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <input className="btn" type="submit" value="Post it" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
