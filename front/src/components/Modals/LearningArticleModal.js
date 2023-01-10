import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import AddButton from "../UI/Button/AddButton/AddButton";
import EditButton from "../UI/Button/EditButton/EditButton";
import {Box, Fade, Grid, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormElement from "../UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../UI/Button/ButtonWithProgress/ButtonWithProgress";
import {
  addLearningArticleRequest,
  clearLearningArticleErrors, editLearningArticleRequest, fetchLearningByCategoryRequest,
  fetchLearningCategoriesRequest
} from "../../store/actions/learningsActions";
import FormSelect from "../UI/Form/FormSelect/FormSelect";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxWidth: '800px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '20px'
};

const LearningArticleModal = ({modalTitle, isAdd, articleID, categoryID}) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.learnings.categories);
  const category = useSelector(state => state.learnings.category);
  const error = useSelector(state => state.learnings.articleError);
  const loading = useSelector(state => state.learnings.articleLoading);

  const [newModal, setNewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [newData, setNewData] = useState({
    title: '',
    description: '',
    text: '',
    learningCategory: ''
  });

  const [editedData, setEditedData] = useState({
    title: '',
    description: '',
    text: '',
    learningCategory: ''
  });

  useEffect(() => {
    dispatch(fetchLearningCategoriesRequest());

  }, [dispatch]);

  useEffect(() => {
    if (error === null) {
      setNewModal(false);
      setEditModal(false);
    }
    // eslint-disable-next-line
  }, [category]);

  const openCloseModal = () => {
    if (isAdd) {
      setNewData({
        title: '',
        description: '',
        text: '',
        learningCategory: ''
      });

      setNewModal(true);
      dispatch(clearLearningArticleErrors());
    } else if (!isAdd) {
      const article = category.find(item => item._id === articleID);
      setEditedData({
        title: article.title,
        description: article.description,
        text: article.text,
        learningCategory: article.learningCategory._id
      });

      setEditModal(true);
      dispatch(clearLearningArticleErrors());
    }
  };

  const inputChangeHandler = (e) => {
    const {name, value} = e.target;
    isAdd
      ? setNewData(prev => ({...prev, [name]: value}))
      : setEditedData(prev => ({...prev, [name]: value}));
  };

  const submitFormHandler = async e => {
    e.preventDefault();

    if (isAdd) {
      await dispatch(addLearningArticleRequest(newData));

      dispatch(fetchLearningByCategoryRequest(categoryID));
    } else {
      await dispatch(editLearningArticleRequest({id: articleID, data: editedData}));

      dispatch(fetchLearningByCategoryRequest(categoryID));
    }
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <>
      {isAdd
        ? <AddButton click={openCloseModal}/>
        : <EditButton
          click={() => openCloseModal()}
        />
      }
      <Modal
        open={isAdd ? newModal : editModal}
        onClose={() => isAdd ? setNewModal(false) : setEditModal(false)}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
      >
        <Fade in={isAdd ? newModal : editModal}>
          <Box sx={style}>
            <div>
              <Grid>
                <Typography variant={'h6'}>
                  {modalTitle}
                </Typography>

                <Grid
                  component='form'
                  container
                  spacing={2}
                  onSubmit={submitFormHandler}
                  pr={'15px'}
                >
                  <Grid
                    item
                    container
                    spacing={2}
                    justifyContent="space-between"
                  >
                    <Grid item width='100%'>
                      <FormElement
                        type={'title'}
                        name={'title'}
                        label={'Article title'}
                        value={isAdd ? newData.title : editedData.title}
                        required={true}
                        onChange={inputChangeHandler}
                        error={getFieldError('title')}
                      />
                    </Grid>

                    <Grid item width="100%">
                      <FormSelect
                        type={'string'}
                        name={'learningCategory'}
                        label={'Category'}
                        value={isAdd ? newData.learningCategory : editedData.learningCategory}
                        onChange={inputChangeHandler}
                        error={getFieldError('learningCategory')}
                        required={true}
                        array={categories}
                        variant="object"
                      />
                    </Grid>

                    <Grid item width='100%'>
                      <FormElement
                        name={'description'}
                        label={'Short Description'}
                        value={isAdd ? newData.description : editedData.description}
                        required={true}
                        onChange={inputChangeHandler}
                        multiline={true}
                        maxRows={3}
                        error={getFieldError('description')}
                      />
                    </Grid>

                    <Grid item width='100%'>
                      <FormElement
                        name={'text'}
                        label={'Text'}
                        value={isAdd ? newData.text : editedData.text}
                        required={true}
                        onChange={inputChangeHandler}
                        multiline={true}
                        maxRows={8}
                        error={getFieldError('text')}
                      />
                    </Grid>

                  </Grid>

                  <Grid item xs={6}>
                    <ButtonWithProgress
                      loading={loading}
                      disabled={loading}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </ButtonWithProgress>
                  </Grid>

                  <Grid item xs={6}>
                    <ButtonWithProgress
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => isAdd ? setNewModal(false) : setEditModal(false)}
                    >
                      Cancel
                    </ButtonWithProgress>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default LearningArticleModal;