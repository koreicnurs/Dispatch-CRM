import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchLearningArticleRequest} from "../../store/actions/learningsActions";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ShowLearningComments from "../../components/ShowLearningComments/ShowLearningComments";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../../components/UI/Button/ButtonWithProgress/ButtonWithProgress";

const LearningArticle = ({match}) => {
  const dispatch = useDispatch();
  const article = useSelector(state => state.learnings.article);
  const error = useSelector(state => state.learnings.articleError);
  const loading = useSelector(state => state.learnings.articleLoading);

  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(fetchLearningArticleRequest(match.params.id));
  }, [dispatch, match.params.id]);

  const onCommentChange = e => {
    setComment(e.target.value);
  };

  const onCommentSubmit = e => {
    e.preventDefault();
    setComment('');
  };

  return article && (
    <InnerContainer >
      <Box paddingX='30px' paddingTop='20px'>
        <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
          {article.title}
        </Typography>
        <Typography variant="body1" mt={3}>
          {article.text}
        </Typography>

        <Box pt='20px' maxWidth='80%' minWidth='270px'>
          <form className="CommentForm" onSubmit={onCommentSubmit}>
            <FormElement
              type='text'
              name='comment'
              value={comment}
              onChange={onCommentChange}
              label='Add Your comment...'
              required={true}
            />
            <ButtonWithProgress
              loading={loading}
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{marginTop: '5px'}}
            >
              Send
            </ButtonWithProgress>
          </form>

          <h4> Comments </h4>
          {article.comments.map(comment => (
            <ShowLearningComments
              key={comment._id}
              author={comment.authorId.displayName}
              role={comment.authorId.role}
              text={comment.text}
              datetime={comment.datetime}
            />
          ))}
        </Box>
      </Box>
    </InnerContainer>
  );
};

export default LearningArticle;