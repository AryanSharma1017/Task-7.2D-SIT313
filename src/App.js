import { useState } from 'react';
import './App.css';
import Article_part from './article';
import Question_part from './question';
import QuestionList from './questionlist';

function App() {
  const [post_type,set_post] = useState('');

  return ( 
    <div className="App">
      <h3>New Post</h3>
      <div className='types'>
        Select Post Type:  Question <input type="radio" value='first' name="Selection" checked={post_type === 'first'} onChange={() => set_post('first')}/> 
        Article <input type="radio" value='second' name="Selection" checked={post_type === 'second'} onChange={() => set_post('second')}/>
        Fetch <input type="radio" value='third' name="Selection" checked={post_type === 'third'} onChange={() => set_post('third')}/>
      </div>

      <h3>What Do you want to Ask or Share</h3>
      {post_type === 'first' && <Question_part/>}
      {post_type === 'second' && <Article_part/>}
      {post_type === 'third' && <QuestionList/>}
      
    </div>
  );
}

export default App;
