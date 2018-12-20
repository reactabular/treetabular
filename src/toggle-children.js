import React from 'react';
import { get } from 'lodash';
import getLevel from './get-level';
import hasChildren from './has-children';

const toggleChildren = ({
  getIndex = rowData => rowData._index, // Look for index based on convention
  getRows,
  getShowingChildren,
  toggleShowingChildren,
  props,
  idField = 'id',
  parentField,
  // Toggling children with a doubleClick would provide better UX
  // since toggling with a click makes it difficult to select each item
  toggleEvent = 'DoubleClick'
} = {}) => {
  if (!getRows) {
    throw new Error('tree.toggleChildren - Missing getRows!');
  }

  if (!getShowingChildren) {
    throw new Error('tree.toggleChildren - Missing getShowingChildren!');
  }

  if (!toggleShowingChildren) {
    throw new Error('tree.toggleChildren - Missing toggleShowingChildren!');
  }

  const toggle = (e, index) => {
    e.stopPropagation();
    e.preventDefault();

    toggleShowingChildren(index);
  };

  return (value, extra) => {
    const { className, ...restProps } = props || {}; // eslint-disable-line react/prop-types
    const rows = getRows();
    const showingChildren = getShowingChildren(extra);
    const index = getIndex(extra.rowData);
    const containsChildren = hasChildren({ index, idField, parentField })(rows) ? 'has-children' : '';
    const level = getLevel({ index, idField, parentField })(rows);
    const hasParent = level > 0 ? 'has-parent' : '';

    const hasAutomaticIndentation = get(props, 'indent', true);

    const events = {
      [`on${toggleEvent}`]: (e) => {
        toggle(e, index);
        window.getSelection && window.getSelection().removeAllRanges();
      }
    };

    const style = hasAutomaticIndentation ? { paddingLeft: `${level}em` } : {};

    return (
      <div
        style={style}
        className={`${containsChildren} ${hasParent} ${className || ''}`}
        {...events}
        {...restProps}
      >
        {containsChildren && <span
          className={showingChildren ? 'show-less' : 'show-more'}
          onClick={e => toggle(e, index)}
        />}
        {value}
      </div>
    );
  };
};

export default toggleChildren;
