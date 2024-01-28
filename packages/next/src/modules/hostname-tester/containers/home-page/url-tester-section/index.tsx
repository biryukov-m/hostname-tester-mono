'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import { IResult } from '@/modules/hostname-tester/types/types';
import { CircularProgressWithLabel } from '@/modules/hostname-tester/components/CircularProgressWithLabel';
import { CustomizedSnackbars } from '@/modules/hostname-tester/components/CustomizedSnackbars';
import { UrlInput } from './url-input';
import { UrlResults } from './url-results';

export const UrlTesterSection = () => {
  const [hostsInput, setHostsInput] = useState('');
  const [results, setResults] = useState<IResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [snackbar, setSnackbar] = useState(false);

  return (
    <>
      {!isLoading && (
        <UrlInput
          {...{
            hostsInput,
            setHostsInput,
            setResults,
            isLoading,
            setIsLoading,
            progress,
            setProgress,
            setSnackbar
          }}
        />
      )}
      <Box>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',

              alignItems: 'center',
              gap: '18px'
            }}
          >
            <div>
              <CircularProgressWithLabel value={progress} />
            </div>
            <h4>Триває тестування...</h4>
          </Box>
        ) : (
          <h2>Результати</h2>
        )}
        <UrlResults {...{ results, progress, isLoading }} />
      </Box>
      <CustomizedSnackbars {...{ open: snackbar, setOpen: setSnackbar }} />
    </>
  );
};
