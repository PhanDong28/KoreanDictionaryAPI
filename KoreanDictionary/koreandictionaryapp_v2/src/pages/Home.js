import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import ParticleSettings from "../components/ParticleSettings"
import Apis, { endpoint } from "../configs/Apis"
import Background from '../images/background.png'

export default function Home() {
    const [originalWord, setOriginalWord] = useState('')
    const [hanViet, setHanViet] = useState('')
    const [chinaWord, setChinaWord] = useState([])
    const [fullMeaning, setFullMeaning] = useState([])
    const [detailChinaMeaning, setDetailChinaMeaning] = useState([])
    const [pronounce, setPronounce] = useState('')
    const [wordType, setWordType] = useState('')

    useEffect(() => {
        const loadHanViet = async () => {
            let res = await Apis.get(endpoint.hanViet(originalWord))
            setHanViet(res.data);
        }

        const loadChinaWord = async () => {
            let res = await Apis.get(endpoint.chinaWord(originalWord))
            setChinaWord(res.data)
        }

        const loadFullMeaning = async () => {
            let res = await Apis.get(endpoint.fullMeaning(originalWord))
            setFullMeaning(res.data)
        }

        const loadWordType = async () => {
            let res = await Apis.get(endpoint.wordType(originalWord))
            setWordType(res.data);
        }

        const loadPronounce = async () => {
            let res = await Apis.get(endpoint.pronounce(originalWord))
            setPronounce(res.data);
        }

        loadHanViet()
        loadChinaWord()
        loadFullMeaning()
        loadWordType()
        loadPronounce()
    }, [originalWord])

    const handleClickChinaWord = (chinaWord, chinaWordID) => {
        let chinaWordBlock = document.querySelector(`#chinaWord${chinaWordID}`)
        let detailChinaMeaningBlock = chinaWordBlock.querySelector(`div`)

        if(detailChinaMeaningBlock.style.display == 'none') {
            detailChinaMeaningBlock.style.display = 'block'
        } else {
            detailChinaMeaningBlock.style.display = 'none'
        }

        const loadDetailChinaMeaning = async () => {
            let res = await Apis.get(endpoint.detailChinaMeaning(originalWord))
            setDetailChinaMeaning(res.data)
        }

        loadDetailChinaMeaning()
    }

    return (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '20px', borderRadius: '10px', color: '#8048b9', border: '4px solid #947aae' }}>
            {/* <ParticleSettings /> */}

            <div style={{display: 'flex'}}>
                <input 
                    type="text" 
                    value={originalWord} 
                    onChange={e => setOriginalWord(e.target.value)}
                    style={{ border: '2px solid #947aae',
                        borderRadius: '10px',
                        padding: '10px',
                        width: '100%',
                        outline: 'none',
                        color: '#8048b9' }} 
                />
            </div>
            <div style={{display: 'flex', margin: '20px 0', alignItems: 'center'}}>
                <h3 style={{fontSize: '70px', minWidth: '300px'}}>{originalWord}</h3>
                {chinaWord.map((cw) => {
                    return <div id={`chinaWord${cw.id}`} key={cw.id} style={{margin: '0 2px', position: 'relative', cursor: 'pointer', padding: '10px', borderRadius: '10px', border: '2px dashed black'}} 
                            onClick={() => handleClickChinaWord(cw.china_word, cw.id)}
                            >
                        <h4>{`${cw.china_word}`}</h4>
                        <h5>{`${cw.short_meaning}`}</h5>

                        <div style={{border: '2px solid #ccc', borderRadius: '12px', width: '200px', padding: '16px', position: 'absolute', top: '110%', backgroundColor: '#947aae', display: 'none', color: '#fff'}}>
                            {detailChinaMeaning.map((dcm) => {
                                return <div key={dcm.id}>
                                    {dcm.detail_china.china_word == cw.china_word && (
                                        <div>
                                            <h5>{cw.china_word} {cw.short_meaning}</h5>
                                            
                                            {dcm.meaning_first != 'NULL' && dcm.meaning_first != null && <li>{dcm.meaning_first}</li>}
                                            {dcm.meaning_second != 'NULL' && dcm.meaning_second != null && <li>{dcm.meaning_second}</li>}
                                            {dcm.meaning_third != 'NULL' && dcm.meaning_third != null && <li>{dcm.meaning_third}</li>}
                                        </div>
                                    )}
                                </div>
                            })}
                        </div>
                    </div>
                })}
            </div>

            <div style={{ margin: '30px 0' }}>
                {pronounce && <div style={{ display: 'flex', margin: '0px' }}>
                    <h5 style={{ display: 'flex', minWidth: '300px', margin: '0px' }}>Phát âm:</h5>
                    <p style={{ margin: '0px' }}>{`[${pronounce}]`}</p>
                </div>}
                
                {hanViet && hanViet != 'NULL' ? <div style={{ display: 'flex', margin: '4px 0' }}>
                    <h5 style={{ display: 'flex', minWidth: '300px', margin: '0px' }}>Từ Hán Việt tương ứng:</h5>
                    <p style={{ margin: '0px' }}>{hanViet}</p>
                </div> 
                : ''}
                
                {wordType && <div style={{ display: 'flex', margin: '0px' }}>
                    <h5 style={{ display: 'flex', minWidth: '300px', margin: '0px' }}>Từ loại:</h5>
                    <p style={{ margin: '0px' }}>{wordType}</p>
                </div>}
            </div>

            <div style={{margin: '20px 0'}}>
                {fullMeaning.map((fm, index) => {
                    return <div key={fm.id}>
                        <h4>{`${index + 1}. ${fm.short_meaning}`}</h4>
                        <p>{fm.full_meaning}</p>
                        {fm.example_1 && <ul>
                            Ví dụ
                            {fm.example_1 && fm.example_1 != 'NULL' && <li style={{ marginLeft: '20px' }}>{fm.example_1}</li>}
                            {fm.example_2 && fm.example_2 != 'NULL' && <li style={{ marginLeft: '20px' }}>{fm.example_2}</li>}    
                        </ul>}
                    </div>
                })}
            </div>
        </div>
    )
}