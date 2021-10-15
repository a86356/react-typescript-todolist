import { Models } from "@rematch/core"
import { book } from "./models/book"
import { home } from "./models/home"
import { choosebook } from "./models/choosebook"
import { bookmissionsetting } from "./models/bookmissionsetting"
import { study } from "./models/study"
import { bookwords } from "./models/bookwords"
import { studyprogress } from "./models/studyprogress"

export interface RootModel extends Models<RootModel> {
    book:typeof book,
    home:typeof home,
    choosebook:typeof choosebook,
    bookmissionsetting: typeof bookmissionsetting,
    study: typeof study,
    bookwords: typeof bookwords,
    studyprogress: typeof studyprogress,
}

export const models: RootModel = { book ,home,choosebook,bookmissionsetting,study,bookwords,studyprogress}