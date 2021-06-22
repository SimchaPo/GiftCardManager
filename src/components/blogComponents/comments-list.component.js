import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

export default function CommentsList(props) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments(props.comments);
  }, [props.comments]);
  return (
    <div>
      {comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment._id}>
            <Card bg="secondary" text="white" border="light">
              <Card.Body>
                <Card.Header>{comment.commentAuthor.userName}</Card.Header>
                <Card.Body>
                  <Card.Text>{comment.commentContent}</Card.Text>
                </Card.Body>{" "}
              </Card.Body>
            </Card>
            <br />
          </div>
        ))}
    </div>
  );
}
