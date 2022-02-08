import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import formatDate from "../../utils/formatDate";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, text, name, user, date },
  // comment: { _id, text, name, picture, user, date },
  auth,
  deleteComment,
}) => (
  <div className="container post border-gold">
    <div>
      <Link to={`/profile/${user}`}>
        {/* <img src={picture} alt="" /> */}
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p>{text}</p>
      <p className="post-date">Posted on {formatDate(date)}</p>
      {!auth.loading && user === auth.user._id && (
        <button onClick={() => deleteComment(postId, _id)} type="button">
          <i />
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
