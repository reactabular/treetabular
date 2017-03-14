import { cloneDeep } from 'lodash';
import { toggleChildren } from '../src';

const dummyRows = [
  {
    id: 'MNU00900',
    parent: null,
    name: 'Configuration'
  },
  {
    id: 'MNU00901',
    parent: 'MNU00900',
    name: 'UserManagement'
  },
  {
    id: 'MNU00902',
    parent: 'MNU00900',
    name: 'MenuManagement'
  },
  {
    id: 'MNU00904',
    parent: 'MNU00902',
    name: 'TEST'
  },
  {
    id: 'MNU00803',
    parent: 'MNU00900',
    name: 'RoleManagement'
  },
  {
    id: 'MNU00905',
    parent: 'MNU00803',
    name: 'TEST'
  }
];

const initializer = {
  getRows: () => dummyRows,
  getShowingChildren: ({ rowData }) => rowData.showingChildren,
  toggleShowingChildren: (rowIndex) => {
    const rows = cloneDeep(dummyRows);
    rows[rowIndex].showingChildren = !rows[rowIndex].showingChildren;
  },
  // Inject custom class name per row here etc.
  props: {}
};

describe('tree.toggleChildren', function () {
  it('returns an root item', function () {
    const value = 'MNU00900';
    const extra = {
      rowIndex: 0,
      rowData: {
        _index: 0,
        id: 'MNU00900',
        parentId: null
      }
    };

    expect(toggleChildren(initializer)(value, extra)).toMatchSnapshot();
  });

  it('double clicking root item works fine', function () {
    const value = 'MNU00900';
    const extra = {
      rowIndex: 0,
      rowData: {
        _index: 0,
        id: 'MNU00900',
        parentId: null
      }
    };
    const tree = toggleChildren(initializer)(value, extra);
    tree.props.onDoubleClick(new Event('ondblclick'));

    expect(tree).toMatchSnapshot();
  });

  it('toggleEvent option should change toggle event', function () {
    const value = 'MNU00900';
    const extra = {
      rowIndex: 0,
      rowData: {
        _index: 0,
        id: 'MNU00900',
        parentId: null
      }
    };
    const tree = toggleChildren({
      ...initializer,
      toggleEvent: 'Click'
    })(value, extra);
    tree.props.onClick(new Event('onclick'));

    expect(tree).toMatchSnapshot();
  });

  it('clicking root tree indicator works fine', function () {
    const value = 'MNU00900';
    const extra = {
      rowIndex: 0,
      rowData: {
        _index: 0,
        id: 'MNU00900',
        parentId: null
      }
    };
    const tree = toggleChildren(initializer)(value, extra);
    const span = tree.props.children[0];
    span.props.onClick(new Event('onclick'));
    expect(tree).toMatchSnapshot();
  });

  it('throw missing getRows error if it missed', function () {
    expect(toggleChildren
      .bind(null, { getShowingChildren: () => {}, toggleShowingChildren: () => {} }))
      .toThrow(Error);
  });

  it('throw missing getShowingChildren error if it missed', function () {
    expect(toggleChildren.bind(null, { getRows: () => {}, toggleShowingChildren: () => {} }))
      .toThrow(Error);
  });

  it('throw missing toggleShowingChildren error if it missed', function () {
    expect(toggleChildren.bind(null, { getRows: () => {}, getShowingChildren: () => {} }))
      .toThrow(Error);
  });
});
