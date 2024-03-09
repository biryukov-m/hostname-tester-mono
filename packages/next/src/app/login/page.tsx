'use client';

import { authenticate } from '@/app/lib/actions';
import { Alert, Button, Container, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useFormState, useFormStatus } from 'react-dom';

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} type="submit" variant="outlined">
      Login
    </Button>
  );
}

export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <Container>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <form action={dispatch}>
          <TextField
            id="password"
            label="password"
            type="password"
            name="password"
            placeholder="*****"
            required
          />

          {errorMessage && (
            <Alert sx={{ my: 1 }} severity="error">
              Ауторизація неуспішна
            </Alert>
          )}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              m: 1
            }}
          >
            <LoginButton />
          </Box>
        </form>
      </Box>
    </Container>
  );
}
