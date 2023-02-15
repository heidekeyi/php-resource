import React from 'react';
import DeletePage from "../../components/delete/DeletePage";
import {useAppDispatch} from "../../store/hooks";
import {IServiceDaily} from "../../services/serviceDaily";
import {messageUpdate} from "../../components/message/sliceMessage";
import {loadingUpdate} from "../../components/loading/sliceLoading";

interface IProps {
    id: string;
    show: boolean;
    onCancel: () => any;
    onSuccess: () => any;
    service: IServiceDaily;
}

const ViewDelete = (props: IProps) => {
    const {show, id, onSuccess, onCancel, service} = props;
    const dispatch = useAppDispatch();
    const onCertain = async () => {
        dispatch(loadingUpdate(true));
        const res = await service.delete(id);
        dispatch(loadingUpdate(false));
        dispatch(messageUpdate(res));
        if (res.status) {
            onSuccess();
            onCancel();
        }
    }
    return (
        <DeletePage
            onCertain={onCertain}
            onCancel={onCancel}
            id={id}
            show={show}
        />
    );
};

export default ViewDelete;