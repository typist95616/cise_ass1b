import WaitingModerationList from './WaitingModerationList';
import ReactDOM from 'react-dom';

it('Renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<WaitingModerationList></WaitingModerationList>, div);
})