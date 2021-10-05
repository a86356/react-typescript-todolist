import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NewsList from "@/views/newlist/components/newslist";
import './index.less'
import {useRouter} from "@/hooks/useRouter";
import GoTop from "@/components/gotop/Index";

const Index = () => {
  const [count, setCount] = useState(1);
  const state1: any = useRouter().location.state;
  const {e_word,c_word} = state1;
  console.log(state1)

  return (
    <div className="container-wrap">
      <div className="video">
        <video width="320" height="240" controls={true}>
          <source src="//cloud.video.taobao.com/play/u/1714128138/p/1/e/6/t/1/259720417003.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="music">
          <audio controls={true}>
              <source src="http://cdn.weixin1234.top/1.m4a"  />
          </audio>
      </div>
      <div className="item">
        <div className="e_word">{e_word}</div>
        <div className="c_word">{c_word}</div>
      </div>
      <div className="video">
        <video width="320" height="240" controls={true}>
          <source src="//cloud.video.taobao.com/play/u/1714128138/p/1/e/6/t/1/259720417003.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="music">
          <audio controls={true}>
              <source src="http://cdn.weixin1234.top/1.m4a"   />
          </audio>
      </div>
      <div className="item">
        <div className="e_word">{e_word}</div>
        <div className="c_word">{c_word}</div>
      </div>
      <div className="video">
        <video width="320" height="240" controls={true}>
          <source src="//cloud.video.taobao.com/play/u/1714128138/p/1/e/6/t/1/259720417003.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="music">
        <audio controls={true}>
          <source src="http://cdn.weixin1234.top/1.m4a"   />
        </audio>
      </div>
      <div className="item">
        <div className="e_word">{e_word}</div>
        <div className="c_word">{c_word}</div>
      </div>

      <GoTop/>

    </div>
  );
};

export default Index;
