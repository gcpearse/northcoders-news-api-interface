const CommentViewer = ({ children, showComments }) => {
  return (
    <section>
      {showComments ? children : null}
    </section>
  );
};

export default CommentViewer;
