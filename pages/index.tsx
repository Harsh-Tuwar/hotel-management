import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Box>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
        <li>
          <Link href="/forgot-password">
            <a>Forgot Password</a>
          </Link>
        </li>
      </ul>
    </Box>
  )
}

export default Home
