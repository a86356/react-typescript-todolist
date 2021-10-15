import React from "react";
import css from './index.module.less'

const Formlogo = () => {

  return (
    <div className={`${css.formlogo}`}>
        <div className={`${css.logo}`}>
            <img src="http://cdn.weixin1234.top/logo1.png" alt=""/>
            <h1>简一英语</h1>
        </div>
    </div>
  );
};

export default Formlogo;
