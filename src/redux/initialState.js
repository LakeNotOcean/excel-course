import { defaultStyles } from "../constants";
import {storage} from '@core/utils'

export const defaultState={
    rowState:{},
    colState:{},
    dataState:{},
    currentText:'',
    currentStyles:defaultStyles,
    stylesState:{},
    title:'Новая Таблица'
}

const normalize=state=>({
    ...state,
    currentStyles:defaultStyles,
    currentText:''
});

export const initialState=storage('excel-state')?normalize(storage('excel-state')):defaultState;