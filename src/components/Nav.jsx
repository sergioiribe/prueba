import PropTypes from 'prop-types';
import coppelBlue from '../assets/coppelBlue.png';

export const Nav = ({ name }) => {
  return (
    <div className="bg-[#006eb5] flex h-[20vh] md:h-[10vh] w-100 justify-center items-center text-white">
    <picture className='w-1/4 md:w-1/6'>
      
        <img src={coppelBlue} alt="Coppel" className="w-20" />
    </picture>
    <p className="text-white font-bold text-[20px]">{name}</p>
</div>
  );
};

Nav.propTypes = {
  name: PropTypes.string.isRequired,
};
