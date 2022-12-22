import {useState, useContext, useEffect} from 'react';
 import FeedbackContext from '../context/FeedbackContext';


const radioButtons =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function RatingSelect({select}) {

    
    const [selected, setSelected] = useState(10);

    const {feedbackEdit} = useContext(FeedbackContext);

    useEffect(()=>{
        setSelected(feedbackEdit.item.rating);
    }, [feedbackEdit])


    const handleSelect =(e)=>{
        setSelected(+e.currentTarget.value);
        select(+e.currentTarget.value);
    }

  return (
    <ul className="rating">
        {
            radioButtons.map((num, index)=>(
                <li key={index}>
                    <input 
                    type='radio'
                    id={`num${num}`}
                    value={`${num}`}
                    name='rating'
                    checked={selected === num}
                    onChange={handleSelect}
                    />
                    <label htmlFor={`num${num}`}>{`${num}`}</label>
                </li>
            ))
        }
    </ul>
  )
}

export default RatingSelect