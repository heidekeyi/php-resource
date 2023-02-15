import {PayloadAction} from "@reduxjs/toolkit";

interface ICategoryForm {
    form: {
        categoryId: string;
        categoryName: string
    }
}

interface IDateForm {
    form: {
        date: string;
    }
}

interface IAmountForm {
    form: {
        amount: string;
    }
}

interface IForm {
    form: {
        show: boolean;
    }
}

const sliceFormHide = (state: IForm) => {
    state.form.show = false;
};

interface ISliceNameFormState {
    form: {
        id: string;
        show: boolean;
        name: string;
        nameId: string;
    };
}

const sliceNameFormState = (): ISliceNameFormState => {
    return {
        form: {
            id: '',
            show: false,
            name: '',
            nameId: ''
        }
    };
};

const sliceNameFormShow = (state: ISliceNameFormState, action: PayloadAction<IObject | undefined>) => {
    const item = action.payload;
    const {nameId, name, id} = item ? item : {id: '', nameId: '', name: 'please select name'};
    state.form.show = true;
    state.form.name = name;
    state.form.nameId = nameId;
    state.form.id = id;
};

const sliceNameFormUpdate = (state: ISliceNameFormState, action: PayloadAction<IObject>) => {
    const {id, name} = action.payload;
    state.form.nameId = id;
    state.form.name = name;
};

interface ISliceParentFormState {
    form: {
        id: string;
        show: boolean;
        name: string;
        nameId: string;
        parentName: string;
        parentId: string;
    };
}


const sliceParentFormState = (): ISliceParentFormState => {
    return {
        form: {
            id: '',
            show: false,
            name: '',
            nameId: '',
            parentId: '',
            parentName: ''
        }
    };
};

const sliceParentFormShow = (state: ISliceParentFormState, action: PayloadAction<IObject | undefined>) => {
    const item = action.payload;
    const {nameId, name, id, parentId, parentName} = item ? item : {
        id: '',
        nameId: '',
        name: 'please select name',
        parentId: '0',
        parentName: '(null)',
    };
    state.form.show = true;
    state.form.name = name;
    state.form.nameId = nameId;
    state.form.parentId = parentId;
    state.form.parentName = parentName;
    state.form.id = id;
};


const sliceParentFormUpdate = (state: ISliceParentFormState, action: PayloadAction<IObject | undefined>) => {
    const item = action.payload;
    const {id, name} = item ? item : {id: '0', name: '(null)'};
    state.form.parentId = id;
    state.form.parentName = name;
};

const sliceParentFormToggle = (state: IForm) => {
    state.form.show = !state.form.show;
};

const sliceCategoryFormUpdate = (state: ICategoryForm, action: PayloadAction<IObject>) => {
    const {id, name} = action.payload;
    state.form.categoryId = id;
    state.form.categoryName = name;
};

const sliceAmountFormUpdate = (state: IAmountForm, action: PayloadAction<string>) => {
    state.form.amount = action.payload;
};
const sliceDateFormUpdate = (state: IDateForm, action: PayloadAction<string>) => {
    state.form.date = action.payload;
};

export {
    sliceFormHide, sliceParentFormShow,
    sliceNameFormShow, sliceNameFormState, sliceNameFormUpdate,
    sliceParentFormState, sliceParentFormUpdate,
    sliceParentFormToggle,
    sliceCategoryFormUpdate,
    sliceDateFormUpdate,
    sliceAmountFormUpdate,
};