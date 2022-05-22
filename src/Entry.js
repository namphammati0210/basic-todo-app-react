import { NextUIProvider, createTheme } from '@nextui-org/react';
import useDarkMode from 'use-dark-mode';
import App from './App';

const darkTheme = createTheme({
  type: 'dark',
});

const lightTheme = createTheme({
  type: 'light',
  
})



const Entry = () => {
  const darkMode = useDarkMode(false);

  return (
    <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
      <App />
    </NextUIProvider>
  )
}

export default Entry;