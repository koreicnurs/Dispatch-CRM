import React from 'react';
import LearningArticleModal from "./LearningArticleModal";

const AddLearningArticle = ({categoryID}) => (
  <LearningArticleModal
    modalTitle={"Add Learning Article"}
    categoryID={categoryID}
    isAdd={true}
  />
);

export default AddLearningArticle;