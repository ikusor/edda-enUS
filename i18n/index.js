import { createI18n } from 'vue-i18n'
import { deepObjectMerge, getLangType } from '../utils'

import fileEnUS from './en-US.json' // 英文包
import fileZhCN from './zh-CN.json' // 中文包
import fileZhTW from './zh-TW.json' // 中文繁体包
import fileEnUSCommon from './en-US-common.json' // 英文公共包
import fileZhCNCommon from './zh-CN-common.json' // 中文公共包
import fileZhTWCommon from './zh-TW-common.json' // 中文繁体公共包

import localeEnUS from 'vant/lib/locale/lang/en-US' //vant 自带国际化英文包
import localeZhCN from 'vant/lib/locale/lang/zh-CN' //vant 自带国际化中文包
import localeZhTW from 'vant/lib/locale/lang/zh-TW' //vant 自带国际化繁体包

const LangEnUS = deepObjectMerge(deepObjectMerge(localeEnUS, fileEnUSCommon), fileEnUS)
const LangZhCN = deepObjectMerge(deepObjectMerge(localeZhCN, fileZhCNCommon), fileZhCN)
const LangZhTW = deepObjectMerge(deepObjectMerge(localeZhTW, fileZhTWCommon), fileZhTW)

const langs = [
    {
        name: '简体中文',
        key: 'zhCn',
        file: fileZhCN,
        messages: LangZhCN,
        locale: localeZhCN,
    },
    {
        name: 'English',
        key: 'en',
        file: fileEnUS,
        messages: LangEnUS,
        locale: localeEnUS,
    },
    // {
    //     name: '繁体中文',
    //     key: 'zhTc',
    //     file: fileZhTW,
    //     messages: LangZhTW,
    //     locale: localeZhTW,
    // },
    {
        name: '繁体中文',
        key: 'zhTc',
        file: fileEnUS,
        messages: LangEnUS,
        locale: localeEnUS,
    },
]

const getLang = function (lang) {
    return langs.find(item => {
        return item.key == lang
    })
}
const defaultLang = 'zhCn'

//初始国际化设置
const i18n = createI18n({
    // locale: store.state.app.lang,
    locale: getLangType(),
    fallbackLocale: defaultLang,
    messages: (() => {
        return langs.reduce((obj, item) => {
            obj[item.key] = item.messages
            return obj
        }, {})
    })(),
})

export { langs, getLang, defaultLang, i18n }
