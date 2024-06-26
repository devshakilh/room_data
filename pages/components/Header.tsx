// components/Header.tsx
import { Typography } from '@mui/material';
import Link from 'next/link';

const Header = () => (
  <Typography variant="h4" component="h1" gutterBottom>
    <Link href='/' ><span className='header_text'>Rate Calendar</span></Link>
  </Typography>
);

export default Header;
