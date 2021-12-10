import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../action/post";
import Spinner from "../layout/spinner";
import PostItem from "../Post/PostItem";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return loading && post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        {" "}
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <Comment postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentForm key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
