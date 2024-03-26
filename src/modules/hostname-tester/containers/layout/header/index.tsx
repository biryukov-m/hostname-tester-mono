'use client';

import { Button, CircularProgress } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0/client';
import * as Styled from './styled';

export const Header = () => {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <div>
        <Styled.Wrapper>
          <CircularProgress />
        </Styled.Wrapper>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Styled.Wrapper>
          <span>Сталася помилка</span>
        </Styled.Wrapper>
      </div>
    );
  }

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
