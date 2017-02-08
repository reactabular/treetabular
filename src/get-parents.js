import _ from 'lodash';

function getParents({
  index,
  idField = 'id',
  parentField = 'parent'
} = {}) {
  return (rows) => {
    const parents = [];
    let currentIndex = index;
    let cell = rows[index];
    let searchingParent;

    if (!cell || _.isNil(cell[parentField])) {
      return parents;
    }

    while (cell) {

      if (typeof searchingParent === 'undefined') {
        searchingParent = cell[parentField];
      } else {
        if (searchingParent === cell[idField]) {
          parents.unshift(cell);
          searchingParent = cell[parentField];
        }
      }

      if (cell[parentField] === null) {
        break;
      }

      currentIndex -= 1;
      cell = rows[currentIndex];
    }

    return parents;
  };
}

export default getParents;
