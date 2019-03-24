import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

/**
 * Component to create a navigation menu.
 */
class Menu extends Component {
  /**
   * @return {*} HTML of react component
   * Render Menu component
   */
  render() {
    return (
      <div id="menu-wrapper">
        <div className="menu-item">
          <NavLink exact
            className="defaultLink"
            activeClassName="activeLink"
            to="/insights">
                      Insights
          </NavLink>
        </div>
        <div className="menu-item">
          <NavLink exact
            className="defaultLink"
            activeClassName="activeLink"
            to="/">
                      Comparison
          </NavLink>
        </div>
        <div className="menu-item">
          <NavLink exact
            className="defaultLink"
            activeClassName="activeLink"
            to="/breakdown">
                      Breakdown
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Menu;
