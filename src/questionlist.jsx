import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import QuestionsFetching from './findquestion'; 

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [expandQuestions, setExpandedQuestions] = useState({});
  const [searchingTags, setSearchTags] = useState('');

  useEffect(() => {
    async function fetchData() {
    const fetchedQuestions = await QuestionsFetching();
    setQuestions(fetchedQuestions);
    }
    fetchData();
  }, []);

    const handleDeleteQuestion = async (id) => {
    try {

      const updatedQuestions = questions.filter((question) => question.id !== id);
      setQuestions(updatedQuestions);

    } 
    
    catch(error) 
    {
      console.log('Error deleting question: ', error);
    }
  };

    const handleExpandQuestion = (id) => {
    setExpandedQuestions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const filteredQuestions = questions.filter((question) =>
    question.tags.toLowerCase().includes(searchingTags.toLowerCase())
  );

  return (
    <div>
      <h1>Questions</h1>
      <div className="search">
        <input
          type="text"  placeholder="Enter tags for search" value={searchingTags} onChange={(e) => 
            setSearchTags(e.target.value)
        }
        />


      </div>

        <div className="questioncards">
            {filteredQuestions.map((question) => (
                <div className="questioncard1" key={question.id}>

                <h3>{question.title}</h3>

                <button onClick={() => handleExpandQuestion(question.id)}>
                {expandQuestions[question.id] ? 'Collapse Data' : 'Expand Data'}

                </button>
            
                {expandQuestions[question.id] && (

                <>
                <p>Problems-:: {question.problem}</p>
                <p>Tags-:: {question.tags}</p>
              </>
            )}


            <button onClick={() => handleDeleteQuestion(question.id)}>Delete Question</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionList;
