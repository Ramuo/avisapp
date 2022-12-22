import {createContext, useState, useEffect} from  'react';


const FeedbackContext = createContext();

// PROVIDER 
export const FeedbackProvider = ({children})=>{

    // STATE
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    // Get Feedback from backend with useEffect
    useEffect(()=>{
        fetchFeedback();
    },[])


    // FUNCTIONS

    // fetch feedback data
    const fetchFeedback = async()=>{
        const response = await fetch(
            `/feedback?_sort=id&_order=desc`);

        const data = await response.json();

        setFeedback(data);
        setIsLoading(false)
    }

    // Add feedback
    const addFeedback = async (newFeedback)=>{
        const response = await fetch(`/feedback/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback),
        })

        const data = await response.json()

        setFeedback([data, ...feedback])
    
    }
    // delete feedback
    
  const deleteFeedback = async (id)=>{
        if(window.confirm('Êtes vous sûr de supprimer cet étélement?')){
            await fetch(`/feedback/${id}`,{
                method: 'DELETE',

            })

        setFeedback(feedback.filter((item) => item.id !== id))
        }
    }
    // edit feedback
    const editFeedback = (item)=>{
        setFeedbackEdit({
            item,
            edit: true,
        })
    }
    // update feedback
    const updateFeedback = async (id, updItem) =>{
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem),
          })
       
          const data = await response.json()

          setFeedback(feedback.map((item) => (item.id === id ? data : item)))

          setFeedbackEdit({
            item: {},
            edit: false,
          })
    }

    // RENDER
    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext
