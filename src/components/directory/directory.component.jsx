import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import SECTIONS from './directory.data';

import './directory.styles.scss';

class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: SECTIONS,
    };
  }

  render() {
    return (
      <div className='directory-menu'>
        {this.state.sections.map(({ id, ...otherSectionsProps }) => (
          <MenuItem key={id} {...otherSectionsProps} />
        ))}
      </div>
    );
  }
}

export default Directory;
