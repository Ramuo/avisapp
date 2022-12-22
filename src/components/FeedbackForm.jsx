import {useState, useContext, useEffect} from 'react';
import FeedbackContext from '../context/FeedbackContext';
import RatingSelect from './RatingSelect';
import Card from './shared/Card';
import Button from './shared/Button';

function FeedbackForm() {
    const [text, setText]= useState('')
    const [rating, setRating]= useState(10)
    const [btnDisabled, setBtnDisabled]= useState(true)
    const [message, setMessage]= useState('')

    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

    useEffect(()=>{
        if(feedbackEdit.edit === true){
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
    },[feedbackEdit])


    const handleChange= (e)=>{
        if(text === ''){
            setBtnDisabled(true)
            setMessage(null)
        }else if(text !== '' && text.trim().length <= 10){
            setBtnDisabled(true)
            setMessage('Votre avis doit contenir au minimum 10 caractères.')
        }else{
            setBtnDisabled(false)
            setMessage(null)
        }

        setText(e.target.value);

       
    }

   const handleSubmit= (e)=>{
    e.preventDefault()
    if(text.trim().length > 10){
        const newFeedback ={
            text,
            rating,
        }

        if(feedbackEdit.edit === true){
            updateFeedback(feedbackEdit.item.id, newFeedback)
        }else{
            addFeedback(newFeedback);
        }

        setText('')
    }
   }


  return (
    <Card>
        <h2>Comment évalueriez-vous notre service ?</h2>
        <RatingSelect select={(rating)=>setRating(rating)}/>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input onChange={handleChange} type="text" placeholder='Laisser votre avis' value={text}/>
                <Button type='submit' isDisabled={btnDisabled}>Send</Button>
            </div>
            {
                message && <div className="message">{message}</div>
            }
        </form>
    </Card>
  )
}

export default FeedbackForm