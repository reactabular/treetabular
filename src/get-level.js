import getParents from './get-parents';

const getLevel = ({
  index,
  idField = 'id',
  parentField = 'parent'
} = {}) => (rows) => (
  getParents({ index, idField, parentField })(rows).length
);

export default getLevel;
