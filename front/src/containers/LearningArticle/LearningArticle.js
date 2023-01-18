import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addLearningCommentRequest, fetchLearningArticleRequest} from "../../store/actions/learningsActions";
import {Box, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import ShowLearningComments from "../../components/ShowLearningComments/ShowLearningComments";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../../components/UI/Button/ButtonWithProgress/ButtonWithProgress";

const LearningArticle = ({match}) => {
  const dispatch = useDispatch();
  const article = useSelector(state => state.learnings.article);
  const loading = useSelector(state => state.learnings.articleLoading);

  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(fetchLearningArticleRequest(match.params.id));
  }, [dispatch, match.params.id]);

  const onCommentChange = e => {
    setComment(e.target.value);
  };

  const onCommentSubmit = async e => {
    e.preventDefault();
    await dispatch(addLearningCommentRequest({id: match.params.id, data: comment}));
    setComment('');
  };

  return article && (
    <InnerContainer >
      <Box paddingX='30px' paddingTop='20px' maxWidth='80%' minWidth='300px'>
        <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
          {article.title}
        </Typography>
        <Typography variant="body1" mt={3}>
          {article.text}
        </Typography>

        <Box pt='20px'>
          <Grid
            component='form'
            container
            spacing={2}
            onSubmit={onCommentSubmit}
          >
              <FormElement
                type='text'
                name='comment'
                value={comment}
                onChange={onCommentChange}
                label='Add Your comment...'
                required={true}
                multiline
                maxRows={10}
              />
              <Grid item sx={{width: '50%'}}>
                <ButtonWithProgress
                  loading={loading}
                  disabled={loading}
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Save
                </ButtonWithProgress>
              </Grid>
              <Grid item sx={{width: '50%'}}>
                <ButtonWithProgress
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => setComment('')}
                >
                  Cancel
                </ButtonWithProgress>
              </Grid>
          </Grid>

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