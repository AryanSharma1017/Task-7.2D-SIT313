import './article.css';
import { useState } from 'react';
import { storage } from './firebase';
import { ref } from 'firebase/storage';
import { uploadBytes } from 'firebase/storage';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

const Article_part = () => {

    const [state,setState] = useState({
        title: '',
        abstract: '',
        articletext: '',
        tags: '',
    });

    const [image, ImageSet] = useState('');
    const ImageUpload = () => {
        if (image == null) return;
        const imageref = ref( storage,'/images/$ {image.name}')

        uploadBytes(imageref, image)
    };


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
        const { title, abstract, articletext, tags } = state;
        console.log('Submitting data:', title, abstract, articletext, tags);

            // if (!title || !abstract || !articletext || !tags) {
            //     alert('Please fill in all fields.');
            //     return;
            // }

        const db = getFirestore();

        const articlecol = collection(db,'articles')

        const PostData = {
            title,
            abstract,
            articletext,
            tags,
        };

        try 
        {
            const storageRefs = ref(storage, '/articles/${file.name}')
            uploadBytes(storageRefs, state)
            await addDoc(articlecol,PostData)
            console.log("Data is sucessfully stored")
            
            // setState({
            //     title: '',
            //     abstract: '',
            //     articletext: '',
            //     tags: '',
            // });
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
        <textarea name="title"  cols="30" rows="2" placeholder='Enter a 1-paragraph abstract'  onChange={posting}></textarea>
        </div>

        <div className='file'>
            <input type="file"  onChange={(event) => {ImageSet(event.target.files[0])}}/>
            <button onClick={ImageUpload}>Upload Image</button>
        </div>

        <div className='Article3'>
        <p>
            Abstract
        </p>
            <textarea name="abstract"  cols="30" rows="2" placeholder='Enter a 1-paragraph abstract'   onChange= {posting}></textarea>
        </div>
        <div className='Article3'>
        <p>
            Article text
        </p>
            <textarea name="articletext"  cols="30" rows="10" placeholder='Enter a 1-paragraph abstract'   onChange= {posting}></textarea>
        </div>

        <div className='Article4'>

        <p>Tags</p>
        <textarea name="tags"  cols="30" rows="2" placeholder='Add upto 3 tags'   onChange= {posting}></textarea>
        </div>

        <button type="submit"  onClick={submission}>POST</button>
       </div> 
    )
}

export default Article_part;