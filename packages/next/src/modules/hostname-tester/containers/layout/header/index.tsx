'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@mui/material';
import * as Styled from './styled';

export const Header = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <Styled.Wrapper>
        {user ? (
          <Styled.UserContainer>
            <p>{user.email}</p>
            <Button href="/api/auth/logout">Вийти</Button>
          </Styled.UserContainer>
        ) : (
          <div>
            <Button href="/api/auth/login">Авторизуватись</Button>
          </div>
        )}
      </Styled.Wrapper>
    </div>
  );
};
