export const SHOPNAME='简一英语'
export const PHONE='phone'
export const TOKEN='token'
export const DEFAULT_YB='fy' //设置的默认值

export const SEP_1='---'
export const SEP_2='|||'
export const SEP_3='|'


export const SOUND_KEYBOARD='1' //发音的键盘按键


//键盘码
export const PLAY_NOW={keycode:49,value:1}  //  大键盘1
export const NEXT_OK={keycode: 50,value:2}  //  大键盘2
export const NEXT_FAIL={keycode:51,value:3}  //   大键盘3
export const COLLECTION={keycode:52,value:4}  //   大键盘4
export const RIGHT_ARROW={keycode:52,value:4}  //   大键盘4
export const LEFT_ARROW={keycode:52,value:4}  //   大键盘4


//学习状态

export class Study_type{
    static UNSTUDY_WORD=1
    static REVIEW_WORD=2
    static COLLECTED_WORD=3
    static ALL_WORD=4
    static WORD_WRONG=5
}

//导航
export class SubNav_type{
    static WORD_STUDY=1
    static WORD_BOOK_SELECT=2
    static STUDY_PROGRESS=3
    static STUDY_SETTING=4
    static AD=5
}

//路由
export class Router_type{
    static HOME_PATH='/'
    static STUDY_PROGRESS='/studyprogress'
    static BOOK_WORDS='/bookwords'
    static BATCH_LISTEN = '/batchlisten'
    static DETAIL_LISTEN = '/detaillisten'
    static ENV_SETTING ='/setting'
    static BOOK_MISSIONSETTING = '/bookmissionsetting'
    static CHOOSE_BOOK = '/choosebooks'
    static BOOKS_LIST = '/books'
    static AD='/ad'
    static ENTRY='/entry'
}


export class Auth_type {
    static NO_PAY='购买单词书,请添加客服微信:100000356'
    static NO_BOOK='这里假如没有搜到您需要的单词书,请联系微信:100000356'
    static NO_LOGIN='请先登陆哦~'
}


//学习方式
export class Study_way{
    static FIRST_STUDY=1;
    static REVIEW_STUDY=2;
}
