import './article.css';
import { useState } from 'react';
import { storage } from './firebase';
import { ref } from 'firebase/storage';
import { uploadBytes } from 'firebase/storage';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';


const Question_part = () => {

    const [state,setState] = useState({
        title: '',
        problem: '',
        tags: '',
    });



    function posting(event) {
        
        const Name = event.target.name;
        const Value = event.target.value;

        console.log('Name:', Name);
        console.log('Value:', Value);
      
        setState((prevalue) => {
          
            const newState = { ...prevalue, [Name]: Value};
            console.log('new state:' ,  newState);
            return newState;
        });
    }


    async function submission(event)
    {
        // event.preventDefault();
        const { title, problem, tags } = state;
        console.log('Submitting data:', title, problem, tags);

            // if (!title || !abstract || !articletext || !tags) {
            //     alert('Please fill in all fields.');
            //     return;
            // }

        const db = getFirestore();

        const articlecol = collection(db,'questions')

        const PostData = {
            title,
            problem,
            tags,
        };

        try 
        {
            const storageRefs = ref(storage, '/questions/${file.name}')
            uploadBytes(storageRefs, state)
            await addDoc(articlecol,PostData)
            console.log("Data is sucessfully stored")
            
            setState({
                title: '',
                abstract: '',
                articletext: '',
                tags: '',
            });
            window.location.reload();

        }

        catch (error) 
        {
            console.log("Error while saving the data" , error);
        }

    };

    return(
       <div className='Article'>
        <div className='Article2'>

        <p>
        Title: 
        </p>
        <input type="text" name='title' placeholder='Start your question with how, what , why etc' onChange={posting}/>
        </div>

        <div className='Article3'>
        <p>
        Describe Your problem
        </p>
            <textarea name="problem"  cols="10" rows="10" onChange={posting}></textarea>
        </div>

        <div className='Article4'>

        <p>Tags</p>
        <input type="text"  name= "tags" placeholder='Please add up to 3 tags to describe what your question is about  eg. C++' onChange={posting}/>
        </div>


        <button type="submit"  onClick={submission}>POST</button>
       </div> 
    )
}

export default Question_part;