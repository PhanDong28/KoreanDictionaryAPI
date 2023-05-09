import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import ParticleSettings from "../components/ParticleSettings"
import Apis, { endpoint } from "../configs/Apis"

export default function Home() {
    const [originalWord, setOriginalWord] = useState('')
    const [chinaWord, setChinaWord] = useState([])
    const [fullMeaning, setFullMeaning] = useState([])
    const [detailChinaMeaning, setDetailChinaMeaning] = useState([])

    useEffect(() => {
        const loadChinaWord = async () => {
            let res = await Apis.get(endpoint.chinaWord(originalWord))
            setChinaWord(res.data)
        }

        const loadFullMeaning = async () => {
            let res = await Apis.get(endpoint.fullMeaning(originalWord))
            setFullMeaning(res.data)
        }

        loadChinaWord()
        loadFullMeaning()
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
        <div style={{background: '#ccc', padding: '20px', borderRadius: '10px', color: 'black'}}>
            <ParticleSettings />

            <input 
                type="text" 
                value={originalWord} 
                onChange={e => setOriginalWord(e.target.value)} 
            />

            <div style={{display: 'flex', margin: '20px 0'}}>
                <h3 style={{margin: '0 10px'}}>{originalWord}</h3>
                {chinaWord.map((cw) => {
                    return <div id={`chinaWord${cw.id}`} key={cw.id} style={{margin: '0 10px', position: 'relative', cursor: 'pointer'}} onClick={() => handleClickChinaWord(cw.china_word, cw.id)}>
                        <h3>{`${cw.china_word}`}</h3>
                        <h3>{`${cw.short_meaning}`}</h3>

                        <div style={{border: '2px solid #ccc', borderRadius: '12px', width: '200px', padding: '16px', position: 'absolute', top: '100%', backgroundColor: 'white', display: 'none'}}>
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

            <div style={{margin: '20px 0'}}>
                {fullMeaning.map((fm) => {
                    return <div key={fm.id}>
                        <h4>{fm.short_meaning}</h4>
                        <p style={{marginLeft: '20px'}}>{fm.full_meaning}</p>
                    </div>
                })}
            </div>
        </div>
    )
}