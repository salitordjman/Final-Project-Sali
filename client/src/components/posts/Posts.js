import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>Posts</h1>
          <PostForm />
          <div>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
