/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

const Conversion = ({ name, value, isDarker }) => (
  <div className={`conversion ${isDarker ? '' : 'conversion--ruber'}`}>
    <h3 className="conversion__name">{name}</h3>
    <p className="conversion__value">{value}</p>
  </div>
);

Conversion.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  isDarker: PropTypes.bool.isRequired,
};

export default Conversion;
