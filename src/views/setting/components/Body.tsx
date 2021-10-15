import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NewsList from "@/views/newlist/components/newslist";
import './Body.less'

const Body = () => {
    const history = useHistory();

    return (
    <div className={'container-body'}>
      <section className={'main-content-container '}>
          <div className="page-header">
              <h1>LINEでログイン</h1>
          </div>
          <div className="tips">
              <div className="item border-right">
                  <h2>
                      Comiruをすでに友達に追加済みの方
                      <br/>
                      以下のアイコンをクリックしてログイン
                  </h2>
                  <div className="imgwrap">
                      <img className={'img1'} src="https://comiru.jp/img/btn_base.png" alt=""/>
                  </div>
              </div>
              <div className="item">
                  <h2>
                      ComiruをLINEではじめてお使いの方
                      <br/>
                      以下のアイコンをクリックして友だち追加
                  </h2>
                  <div className="imgwrap">
                      <img className={'img2'} src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt=""/>
                  </div>
              </div>
          </div>
          <div className="page-header">
              <h1>生徒・保護者ログイン<span>（スクールポパー）</span></h1>
          </div>
          <p >生徒番号とパスワードを入力してログインしてください。<span >生徒番号</span>や<span  >パスワード</span>がわからない場合は、教室にお問い合わせください。</p>

          <div className={'form'}>
              <div className="form-group-radio form-group">
                  <div className="radioitem">
                      <input type="radio" name="role" value="parent" />
                      <label>保護者</label>
                  </div>
                  <div className={'radioitem'}>
                      <input type="radio" name="role" value="subStudent" />
                      <label>生徒</label>
                  </div>
              </div>
              <div className="form-group">
                  <label htmlFor="student-no" className="form-label">生徒番号</label>
                  <input type="text" name="student_no" id="student-no" className="form-control" />
              </div>
              <div className="form-group">
                  <label htmlFor="password" className="form-label">パスワード</label>
                  <input type="password" name="password" id="password" className="form-control" />
              </div>
              <div className="form-group">
                  <label htmlFor="show-password" className="form-label">

                  </label>
                  <input type="checkbox" id="show-password"/>
                      パスワードを表示
              </div>
              <div className="form-group form-group-btn">
                      <button type="submit" className={"btn"} onClick={()=>{
                          history.push({ pathname: "/detail", state: { e_word: 'state',c_word:'国家，政权' } });
                      }}>ログインする</button>
              </div>
          </div>
          <div className={'form-group-forget'}>
              <li><a href="/students/reset/password">パスワードを忘れた方はこちら</a></li>
          </div>
      </section>
    </div>
  );
};

export default Body;
