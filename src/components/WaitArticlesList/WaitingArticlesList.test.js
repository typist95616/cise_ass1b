import WaitingArticlesList from './WaitingArticlesList';
import ReactDOM from 'react-dom';

it('Renders without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<WaitingArticlesList></WaitingArticlesList>, div);
})