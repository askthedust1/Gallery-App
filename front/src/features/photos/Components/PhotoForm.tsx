import React, { useState } from 'react';
import {Alert, Grid, TextField} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { useNavigate } from 'react-router-dom';
import {PhotoMutation} from "../../../types";
import {selectPhotosCreateLoading, selectPhotosError} from "../photosSlice";
import FileInput from "../../../components/UI/FileInput/FileInput";
import {createPhoto} from "../photosThunk";

const PhotoForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectPhotosCreateLoading);
    const error = useAppSelector(selectPhotosError);

    const [state, setState] = useState<PhotoMutation>({
        name: '',
        image: null
    });

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(createPhoto(state)).unwrap();
            setState({name: '', image: null});
            navigate('/');
        } catch (e) {
            // nothing
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setState((prevState) => {
            return { ...prevState, [name]: value };
        });
    };

    const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;

        if (files) {
            setState((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    const getFieldError = () => {
        try {
            return error?.error;
        } catch {
            return undefined;
        }
    };

    return (
        <div style={{width:'40%', margin: '20px auto'}}>
            {error && (
                <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
                    {error.error}
                </Alert>
            )}
            <form autoComplete="off" onSubmit={submitFormHandler} style={{ width: '100%' }}>
                <h2 style={{ color: 'white', margin: '10px 0' }}>Add cocktail</h2>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                        <TextField
                            sx={{ width: '100%', background: 'white', borderRadius: 2 }}
                            id="name"
                            label="Name"
                            value={state.name}
                            onChange={inputChangeHandler}
                            name="name"
                            error={Boolean(getFieldError())}
                            helperText={getFieldError()}
                        />
                    </Grid>

                    <Grid item xs>
                        <FileInput onChange={filesInputChangeHandler} name="image" label="image" />
                    </Grid>

                    <Grid item xs>
                        <LoadingButton
                            type="submit"
                            size="small"
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            {' '}
                            <span>Send</span>
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default PhotoForm;