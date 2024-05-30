import React, { useEffect } from 'react';
import './Modal.css';

function Modal2(props) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                props.onClickX && props.onClickX();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [props.onClickX]);

    return (
        <div className="modal">
            <div className='modalAdv'>
                {(props.onClickX != null) ? (
                    <div className="aLaDerechaConGrid">
                        <button className='btnCerrarModal' onClick={props.onClickX}>X</button>
                    </div>
                ) : null}
                {props.children}
            </div>
        </div>
    )
}

export default Modal2;