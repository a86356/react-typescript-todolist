import React from "react";
import SearchBar from "@/views/choosebooks/components/searchbar/Index";
import CategoryList from "@/views/choosebooks/components/category/Index";
import BookList from "@/views/choosebooks/components/booklist/Index";

const ChooseBooks= () => {
    return (
    <div className={`bodycontainer`} >
        <SearchBar/>
        <div style={{display:"flex"}}>
            <CategoryList/>
            <BookList/>
        </div>
    </div>

  );
};

export default ChooseBooks;
