import React, {useEffect, useState} from 'react';
import {Box, Grid, IconButton, InputBase, styled} from "@mui/material";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import {useDispatch, useSelector} from "react-redux";
import {
  deleteLearningArticleRequest,
  fetchLearningByCategoryRequest,
  searchArticleRequest
} from "../../store/actions/learningsActions";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import InnerTable from "../../components/Table/InnerTable";
import LearningTableBody from "../../components/Table/TableBody/LearningTableBody";
import AddLearningArticle from "../../components/Modals/AddLearningArticle";

const SearchStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#fff',
  },
  marginRight: theme.spacing(6),
  marginLeft: 0,
  marginTop: '25px',
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const columns = [
  {key: 'title', label: 'Title'},
  {key: 'description', label: 'Description'},
  {key: 'author', label: 'Author', innerKey: 'displayName'},
  {key: 'date', label: 'Date created'},
];

const LearningCategory = ({location}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const category = useSelector(state => state.learnings.category);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.getAll('category');
    setCategoryID(id[0]);
    dispatch(fetchLearningByCategoryRequest(id[0]));
  }, [dispatch, location.search]);

  const onDelete = async (id) => {
    await dispatch(deleteLearningArticleRequest(id));
    dispatch(fetchLearningByCategoryRequest(categoryID));
  };

  const searchArticle = async () => {
    await dispatch(searchArticleRequest({id: categoryID, title: searchVal}));
  };

  return (
    <InnerContainer>

      <Grid item sx={{paddingLeft: "15px"}}>
        <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
          Learnings
        </Typography>
      </Grid>
      <Grid
        item
        container
        spacing={2}
        justifyContent="space-between"
      >

        <Grid padding="15px">
          {user?.role === 'admin' &&
            <AddLearningArticle categoryID={categoryID}/>
          }
        </Grid>

        <Grid>
          <SearchStyle>
            <IconButton onClick={searchArticle}>
              <SearchIcon />
            </IconButton>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setSearchVal(e.target.value)}
            />
          </SearchStyle>
        </Grid>
      </Grid>

      <Box>
        {category.length < 1
          ? <Typography fontWeight="bold" marginLeft={'20px'}>
              There are no any articles yet in selected category...
            </Typography>
          : <Box>
            <Typography variant="h6" fontWeight="bold" marginLeft={'20px'} textTransform="uppercase">
              {category[0].learningCategory.title}
            </Typography>
              <InnerTable
                header={<TableHeaderRow headerCells={columns} data={true} sx={{fontSize: "14px", fontWeight: "bold"}}/>}
                body={
                  <LearningTableBody
                    columns={columns}
                    filteredData={category}
                    user={user}
                    onDelete={onDelete}
                  />
                }
              />
          </Box>
        }
      </Box>

    </InnerContainer>
  );
};

export default LearningCategory;