'use client';

import React from 'react';
import { Box, Button } from '@mui/material';
import { hostService } from '@/modules/hostname-tester/services/HostService';
import { urlManipulationService } from '@/modules/hostname-tester/services/UrlManipulationService';
import { IResult } from '@/modules/hostname-tester/types/types';
import * as Styled from './styled';

interface IProps {
  hostsInput: string;
  setHostsInput: React.Dispatch<React.SetStateAction<string>>;
  setResults: React.Dispatch<React.SetStateAction<IResult[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UrlInput: React.FC<IProps> = ({
  hostsInput,
  setHostsInput,
  setResults,
  isLoading,
  setIsLoading,
  setProgress,
  setSnackbar
}) => {
  const processBatch = async (urls: string[], batchSize: number, currentIndex: number) => {
    if (currentIndex >= urls.length) {
      setIsLoading(false);
      setProgress(100);
      setSnackbar(true);
      return;
    }
    const batchUrls = urls.slice(currentIndex, currentIndex + batchSize);

    try {
      const batchResults = await hostService.checkMultipleHosts(batchUrls);
      setResults((prevResults) => [...prevResults, ...batchResults]);

      const progress = ((currentIndex + batchSize) / urls.length) * 100;
      setProgress(progress);
    } catch (error) {
      /* empty */
    }
    processBatch(urls, batchSize, currentIndex + batchSize);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);

    const urls =
      hostsInput.length > 0 ? urlManipulationService.convertStrToHostsArr(hostsInput) : null;

    if (urls) {
      setResults([]);
      const batchSize = 10;
      // Start processing batches recursively
      await processBatch(urls, batchSize, 0);
    }
  };
  const handleTextareaChange = (event: React.ChangeEvent<any>) => {
    setHostsInput(event.target.value);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Box
        sx={{
          display: 'flex',
          margin: '0 auto',
          maxWidth: 600,
          flexDirection: 'column',
          rowGap: 2,
          justifyContent: 'center'
        }}
      >
        <label htmlFor="websiteTextarea">Введіть адреси сайтів (кожна з нового рядку):</label>
        <Styled.CustomTextareaAutosize
          id="websiteTextarea"
          minRows={5}
          cols={50}
          value={hostsInput}
          onChange={(e: React.ChangeEvent<any>) => handleTextareaChange(e)}
          required
          minLength={10}
          placeholder="google.com або http://google.com ..."
        />
        <Box margin="0 auto">
          <Button type="submit" disabled={isLoading}>
            Перевірити доступність
          </Button>
        </Box>
      </Box>
    </form>
  );
};
