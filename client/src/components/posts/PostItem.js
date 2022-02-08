import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, user, likes, comments, date },
  // post: { _id, text, name, picture, user, likes, comments, date },
  showActions,
}) => (
  <div className="post border-gold">
    <div>
      <Link to={`/profile/${user}`}>
        {/* <img src={picture} alt="" /> */}
        <h2>{name}</h2>
      </Link>
    </div>
    <div>
      <p>{text}</p>
      <p className="post-date">Posted on {formatDate(date)}</p>

      {showActions && (
        <>
          <button
            className="btn-emoji"
            onClick={() => addLike(_id)}
            type="button"
          >
            <span style={{ color: "green" }}>
              {likes.length > 0 && (
                <span style={{ fontWeight: "bolder" }}>{likes.length}</span>
              )}
              <span className="fas fa-thumbs-up" />
            </span>
          </button>
          <button
            className="btn-emoji"
            onClick={() => removeLike(_id)}
            type="button"
          >
            <span style={{ color: "red" }} className="fas fa-thumbs-down" />
          </button>
          <Link to={`/posts/${_id}`}>
            📝Comments {comments.length > 0 && <span>{comments.length}</span>}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              className="btn-emoji"
              onClick={() => deletePost(_id)}
              type="button"
            >
              ❌
            </button>
          )}
        </>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
