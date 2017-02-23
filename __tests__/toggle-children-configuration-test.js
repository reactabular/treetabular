/**
 * Created by piotr on 23/02/17.
 */
import { cloneDeep } from 'lodash';
import { toggleChildren } from '../src';

const dummyRows = [
  {
    id: '0',
    parent: null
  },
  {
    id: '1',
    parent: '0'
  },
  {
    id: '2',
    parent: '1'
  }
];

const initializerWithAutomaticIndentation = {
  getRows: () => dummyRows,
  getShowingChildren: ({ rowData }) => rowData.showingChildren,
  toggleShowingChildren: (rowIndex) => {
    const rows = cloneDeep(dummyRows);
    rows[rowIndex].showingChildren = !rows[rowIndex].showingChildren;
  },
  props: {}
};

const initializerWithoutAutomaticIndentation = {
  ...initializerWithAutomaticIndentation,
  props: {
    automaticIndentation: false
  }
};

describe('tree.toggleChildren configuration', function () {
  const rowValue = '2';
  const rowExtraInfo = {
    rowData: {
      _index: 2
    }
  };

  it('supports automatic indentation', () => {
    const toggled = toggleChildren(initializerWithAutomaticIndentation)(rowValue, rowExtraInfo);
    const { style } = toggled.props;

    expect(style.paddingLeft).toBeDefined();
  });

  it('supports disabling automatic indentation', () => {
    const toggled = toggleChildren(initializerWithoutAutomaticIndentation)(rowValue, rowExtraInfo);
    const { style } = toggled.props;

    expect(style.paddingLeft).not.toBeDefined();
  });
});
