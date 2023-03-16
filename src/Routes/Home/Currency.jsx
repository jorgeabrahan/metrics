import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Currency = ({
  short, name,
}) => (
  <NavLink to={`/details/${short}`}>
    <div>
      <h2 className="currency__title">
        { name }
      </h2>
      <small>{ short }</small>
    </div>
    <div className="currency__icon">
      <span className="material-symbols-outlined">
        arrow_right_alt
      </span>
    </div>
  </NavLink>
);

Currency.propTypes = {
  short: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Currency;
