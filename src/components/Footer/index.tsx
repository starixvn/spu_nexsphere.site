/* 
 *************************************
 * <!-- Footer -->
 *************************************
 */
import appData from "@/data/app.json";
import styles from '@/styles/webpage.module.scss'

export default function Footer() {
    return (
        <>
            <footer className={styles.clearfix}>
               <p dangerouslySetInnerHTML={{__html: appData.copyright}}/>
            </footer>

        </>
    )
}

