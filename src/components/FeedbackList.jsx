import {motion, AnimatePresence} from 'framer-motion';
import {useContext} from 'react';
import FeedbackContext from '../context/FeedbackContext';
import Spinner from './shared/Spinner';
import FeedbackItem from "./FeedbackItem";

function FeedbackList() {

    const {feedback, isLoading} = useContext(FeedbackContext)

    if(!isLoading && (!feedback || feedback.length === 0)){
        return <p>Il n'y a pas d'avis pour le moment.</p>
    }

    return isLoading ? <Spinner/> : (
        <div className="feedback-list">
            <AnimatePresence>
                {
                    feedback.map((item)=>(
                        <motion.div 
                        key={item.id}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exite={{opacity: 0}}
                        >
                            <FeedbackItem item={item} key={item.id}/>
                        </motion.div>
                    ))
                }
            </AnimatePresence>
        </div>
    )

   


//   return (
//     <div className="feedback-list">
//         {
//             feedback.map((item)=>(
//                 <FeedbackItem item={item} key={item.id} handleDelete={handleDelete}/>
//             ))
//         }
//     </div>
//   )
}

export default FeedbackList