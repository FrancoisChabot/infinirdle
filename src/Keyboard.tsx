import { useEffect } from "react";
import styles from './Keyboard.module.css'

const KB_KEYS = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',''],
    ['ENTER','z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫']
];

const KeyboardRow = (props: {keys: string[], onKey: (k: string)=>void})=>{
    return <div className={styles.row}>
        {props.keys.map((k, i)=>{
            
            if(k === '') {
                return <div key={i} className={styles.spacer}></div>;
            }

            let style = styles.key;
            if(k === "ENTER" || k === "⌫") {
                style += ' ' + styles.bigKey;
            }
            return <button className={style} onClick={()=>props.onKey(k)} key={i}>{k}</button>;
        })}
    </div>
};

const Keyboard = (props: {onKey: (k: string)=>void})=>{
    const parentCb = props.onKey;

    useEffect(()=>{
        const cb = (e: KeyboardEvent)=>{
            let v = e.key;
            if(v === "Enter") {
                v = "ENTER";
            }
            if(v === "Backspace") {
                v = '⌫';
            }
            parentCb(v);
        };

        window.addEventListener("keydown", cb);
        return ()=>{
            window.removeEventListener("keydown", cb);
        }
    } , [parentCb]);

    return <div>
        {KB_KEYS.map((r,i)=><KeyboardRow key={i}keys={r} onKey={props.onKey}/>)}
    </div>
};

export default Keyboard;