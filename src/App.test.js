import { render, screen } from '@testing-library/react';
import App from './App';
import * as ReactDOM from 'react-dom/client';
import StyledButton from './components/Button/StyledButton.js';
import TagInput from './components/Tag/Tag.js';
import "@testing-library/jest-dom/extend-expect";
import { act } from 'react-dom/test-utils';

test('get a list', async ()=>{
  const axios = require("axios");
  act(()=>{
    axios
    .get('http://localhost:5001/APITesting')
    .then(res => {
      console.log(res.data)
    })
  })
});

test('render without crashing', ()=>{
  const div = document.createElement("div");
  const root = ReactDOM.createRoot(div);
  act(()=>{
    root.render(<StyledButton/>);
    root.unmount();
  })
});

it('button render correctly', ()=>{
  render(<TagInput name='Approve'/>);
  expect(screen.getByTestId('tag')).toHaveTextContent('Approve');
});