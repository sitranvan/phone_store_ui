import * as React from 'react'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize'
import { styled } from '@mui/system'

export default function Textarea({ widthMd = '800px', widthXs = '100%', minRows = 3, placeholder = '', ...rest }) {
    const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
   
    @media (min-width: ${theme.breakpoints.values.xs}px) {
        width:${widthXs}; 
      }
      @media (min-width: ${theme.breakpoints.values.md}px) {
        width: ${widthMd}; 
      }
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color:#2c387e;
    background: #ffff;
    border: 1px solid #C7D0DD;
    box-shadow: 0px 2px 2px #F3F6F9;

    &:hover {
      border-color:#b6daff;
    }

    &:focus {
      border-color: #3399FF;
      box-shadow: 0 0 0 3px #b6daff;
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
    )

    return <Textarea autoFocus {...rest} aria-label='minimum height' minRows={minRows} placeholder={placeholder} />
}
