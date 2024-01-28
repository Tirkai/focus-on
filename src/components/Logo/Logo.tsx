import { FC } from 'react';

interface ILogoProps {
  width: string;
}

const Logo: FC<ILogoProps> = ({ width }) => {
  return (
    <img
      src="./../../assets/logo.svg"
      style={{ width }}
      alt="My logo should be here"
    />
  );
};

export default Logo;
