import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

async function QuestionsFetching() {
const questionsCollection = collection(db, 'questions'); 

try {
   const querySnapshot = await getDocs(questionsCollection);
    const questions = [];

    querySnapshot.forEach((doc) => {
      questions.push({ id: doc.id,
      ...doc.data() });
    });


    return questions;
  } 

  catch (error) {

    console.log('Error fetching questions: ', error);
    return [];
  };
};

export default QuestionsFetching;

