import axios from "axios"

export let endpoint = {
    "chinaWord": (originalWord) => `/original-word/detail-china/?original-word=${originalWord}`,
    "fullMeaning": (originalWord) => `/original-word/full-meaning/?original-word=${originalWord}`,
    "detailChinaMeaning": (originalWord) => `/detail-china/detail-china-meaning/?original-word=${originalWord}`
}

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})