import { forwardRef, useImperativeHandle, useRef} from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal({onReset , targetTime, remainingTime}, ref){

    const dialog = useRef();

    const userLost = remainingTime <= 0;

    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100)

    useImperativeHandle(ref, () => {
        return{
            open(){
                dialog.current.showModal();
            }
        }
    });

    return createPortal (
        <dialog ref={dialog} className = "result-modal">
           {userLost && <h2>You lost</h2>}
           {!userLost && <h2>Your Score: {score}</h2>}
            <p>
                The Target Time was <strong>{targetTime}</strong>
            </p>
            <p>
                You stoppped the timer with <strong>{formattedRemainingTime}</strong>
            </p>
            <form method="dialog" onSubmit={onReset}> {/* onClose or onSubmit */}
                <button>close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
})

export default ResultModal;