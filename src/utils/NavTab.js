import React from 'react';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line react/display-name
const TabLink = React.forwardRef(
  ({ className, style, children, navigate, ...props }, ref) => (
    <li style={style} className={className}>
      <a
        ref={ref}
        {...props}
        onClick={(event) => {
          event.preventDefault();
          navigate();
        }}
      >
        {children}
      </a>
    </li>
  ),
);

const NavTab = (props) => {
  return <NavLink {...props} component={TabLink} activeClassName="is-active" />;
};

export default NavTab;
