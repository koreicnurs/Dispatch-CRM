import React from 'react';
import {TableCell} from "@mui/material";
import LearningArticleModal from "./LearningArticleModal";

const EditLearningArticle = ({articleID, categoryID}) => (
  <TableCell>
    <LearningArticleModal
      modalTitle={"Edit Learning Article"}
      articleID={articleID}
      categoryID={categoryID}
    />
  </TableCell>
);

export default EditLearningArticle;