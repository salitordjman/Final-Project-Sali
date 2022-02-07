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
  post: { _id, text, name, picture, user, likes, comments, date },
  showActions,
}) => (
  <div>
    <div>
      <Link to={`/profile/${user}`}>
        <img src={picture} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p>{text}</p>
      <p>Posted on {formatDate(date)}</p>

      {showActions && (
        <>
          <button onClick={() => addLike(_id)} type="button">
            <i /> <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button onClick={() => removeLike(_id)} type="button">
            <i />
          </button>
          <Link to={`/posts/${_id}`}>
            Discussion {comments.length > 0 && <span>{comments.length}</span>}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button onClick={() => deletePost(_id)} type="button">
              <i />
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
