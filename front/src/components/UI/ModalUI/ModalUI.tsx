import { Box, Modal } from '@mui/material';
import React from 'react';
import {apiUrl} from "../../../constants";

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 560,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
};

interface Props {
    show: boolean;
    image: string | undefined;
    onClose: React.MouseEventHandler;
}

const ModalUi: React.FC<Props> = ({ show, image, onClose }) => {
    return (
        <Modal
            open={show}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <img src={apiUrl + '/' + image} alt="image" />
            </Box>
        </Modal>
    );
};

export default ModalUi;