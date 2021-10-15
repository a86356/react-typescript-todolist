import React from "react";
import css from './index.module.less'
import BooksWordsLeft from "@/views/bookwords/components/left/Index";
import BooksWordsRight from "@/views/bookwords/components/right/Index";

const BooksWords= () => {

    const book_id = 4;

    return (
    <div className={`bodycontainer ${css.bookwords} p20`} >
        <BooksWordsLeft book_id={book_id}/>
        <BooksWordsRight book_id={book_id}/>
    </div>
  );
};

export default BooksWords
