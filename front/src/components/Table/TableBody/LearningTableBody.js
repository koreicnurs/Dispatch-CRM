import React from 'react';
import {IconButton, TableCell, TableRow} from "@mui/material";
import EditLearningArticle from "../../Modals/EditLearningArticle";
import {Delete} from "@mui/icons-material";

const LearningTableBody = ({columns, filteredData, user, onDelete}) => {
  return (
    <>
      {filteredData.map(article => (
        <TableRow
          key={article._id}
          sx={{
            '&:last-child td, &:last-child th': {border: 0}, background: "white"}}
        >
          {columns.map(column => {
            let value = article[column.key];
            if (column.innerKey) {
              value = value[column.innerKey];
            }
            if (column.key === 'date'){
              value = new Date(value)
                .toLocaleTimeString([],
                  {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
            }
            return <TableCell sx={{fontSize: "14px"}} key={column.key + column.innerKey}>{value}</TableCell>;
          })}
          {user?.role === 'admin' &&
            <>
              <EditLearningArticle
                articleID={article._id}
                categoryID={article.learningCategory._id}
              />
              <TableCell>
                <IconButton color="primary" onClick={() => onDelete(article._id)}>
                  <Delete/>
                </IconButton>
              </TableCell>
            </>
          }
        </TableRow>
      ))}
    </>
  );
};

export default LearningTableBody;