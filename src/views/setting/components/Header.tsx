import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NewsList from "@/views/newlist/components/newslist";
import './Header.less'

const Header = () => {

  return (
    <header className="new-header">
      <div className="left">
        <a className={'logowrap'}>
          <img className={'logo'} src="https://comiru.jp/img/index/logo.png?f4a6d84d" />
        </a>
        <h1 className="header-title">塾専用コミュニケーション &amp;業務管理システム</h1>
      </div>
      <div className="right">
        <nav className={'header-link-area'}>
          <ul className={'nav-header nav-header-pc'}>
            <li className={'header-link more-info'}>
              <a className={'link'}>
                <span>サービス</span>
                <i className="icon iconfont">&#xe6cc;</i>
              </a>
              <div className="menu-container">
                <ul className="sub">
                  <li><a href="/" className="footer-link">サービス一覧</a></li>
                  <li><a href="/" className="footer-link">ComiruBASIC</a></li>
                  <li><a href="/" className="footer-link">ComiruFREE</a></li>
                  <li><a href="//" className="footer-link">ComiruAir</a></li>
                  <li><a href="https://contents.comiru.jp/feature/hr/" className="footer-link">ComiruHR</a></li>
                </ul>
              </div>
            </li>
            <li className={'header-link more-info'}>
              <a className={'link'}>
                <span>サービス</span>
                <i className="icon iconfont">&#xe6cc;</i>
              </a>
              <div className="menu-container">
                <ul className="sub">
                  <li><a href="/" className="footer-link">サービス一覧</a></li>
                  <li><a href="/" className="footer-link">ComiruBASIC</a></li>
                  <li><a href="/" className="footer-link">ComiruFREE</a></li>
                  <li><a href="//" className="footer-link">ComiruAir</a></li>
                  <li><a href="https://contents.comiru.jp/feature/hr/" className="footer-link">ComiruHR</a></li>
                </ul>
              </div>
            </li>
            <li className={'header-link more-info'}>
              <a className={'link'}>
                <span>サービス</span>
                <i className="icon iconfont">&#xe6cc;</i>
              </a>
              <div className="menu-container">
                <ul className="sub">
                  <li><a href="/" className="footer-link">サービス一覧</a></li>
                  <li><a href="/" className="footer-link">ComiruBASIC</a></li>
                  <li><a href="/" className="footer-link">ComiruFREE</a></li>
                  <li><a href="//" className="footer-link">ComiruAir</a></li>
                  <li><a href="https://contents.comiru.jp/feature/hr/" className="footer-link">ComiruHR</a></li>
                </ul>
              </div>
            </li>
            <li className={'header-link more-info'}>
              <a className={'link'}>
                <span>サービス</span>
                <i className="icon iconfont">&#xe6cc;</i>
              </a>
              <div className="menu-container">
                <ul className="sub">
                  <li><a href="/" className="footer-link">サービス一覧</a></li>
                  <li><a href="/" className="footer-link">ComiruBASIC</a></li>
                  <li><a href="/" className="footer-link">ComiruFREE</a></li>
                  <li><a href="//" className="footer-link">ComiruAir</a></li>
                  <li><a href="https://contents.comiru.jp/feature/hr/" className="footer-link">ComiruHR</a></li>
                </ul>
              </div>
            </li>
            <li className={'header-link more-info'}>
              <a className={'link'}>
                <span>サービス</span>
                <i className="icon iconfont">&#xe6cc;</i>
              </a>
              <div className="menu-container">
                <ul className="sub">
                  <li><a href="/" className="footer-link">サービス一覧</a></li>
                  <li><a href="/" className="footer-link">ComiruBASIC</a></li>
                  <li><a href="/" className="footer-link">ComiruFREE</a></li>
                  <li><a href="//" className="footer-link">ComiruAir</a></li>
                  <li><a href="https://contents.comiru.jp/feature/hr/" className="footer-link">ComiruHR</a></li>
                </ul>
              </div>
            </li>
            <li className={'header-link more-info'}>
              <a className={'link'}>
                <span>サービス</span>
                <i className="icon iconfont">&#xe6cc;</i>
              </a>
              <div className="menu-container">
                <ul className="sub">
                  <li><a href="/" className="footer-link">サービス一覧</a></li>
                  <li><a href="/" className="footer-link">ComiruBASIC</a></li>
                  <li><a href="/" className="footer-link">ComiruFREE</a></li>
                  <li><a href="//" className="footer-link">ComiruAir</a></li>
                  <li><a href="https://contents.comiru.jp/feature/hr/" className="footer-link">ComiruHR</a></li>
                </ul>
              </div>
            </li>
            <li className={'header-link more-info'}>
              <a className={'link'}>
                <span>サービス</span>
                <i className="icon iconfont">&#xe6cc;</i>
              </a>
              <div className="menu-container">
                <ul className="sub">
                  <li><a href="/" className="footer-link">サービス一覧</a></li>
                  <li><a href="/" className="footer-link">ComiruBASIC</a></li>
                  <li><a href="/" className="footer-link">ComiruFREE</a></li>
                  <li><a href="//" className="footer-link">ComiruAir</a></li>
                  <li><a href="https://contents.comiru.jp/feature/hr/" className="footer-link">ComiruHR</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        <div className="login-btn">
          <a href="/">塾講師ログイン</a>
        </div>

        <div className="menu-box">
          <label id="hamburger-1" className="hamburger">
            <span className="line line-01"></span>
            <span className="line line-02"></span>
            <span className="line line-03"></span>
          </label>
        </div>

      </div>

    </header>
  );
};

export default Header;
