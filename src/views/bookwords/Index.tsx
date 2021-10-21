import React from "react";
import css from './index.module.less'
import BooksWordsLeft from "@/views/bookwords/components/left/Index";
import BooksWordsRight from "@/views/bookwords/components/right/Index";

import {useParams} from "react-router-dom";
type  Param = {
    id:string,
    study_type:string
}

const BooksWords= () => {
    const {id,study_type} = useParams<Param>() ;
    const book_id = id;

    return (
    <div className={`bodycontainer ${css.bookwords} p20`} >
        <BooksWordsLeft book_id={parseInt(book_id)} study_type={parseInt(study_type)} />
        <BooksWordsRight book_id={parseInt(book_id)}/>
    </div>
  );
};

export default BooksWords
