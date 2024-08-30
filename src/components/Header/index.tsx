/* 
 *************************************
 * <!-- Header -->
 *************************************
 */
import Link from 'next/link';
import Image from 'next/image';
import appData from "@/data/app.json";
import styles from '@/styles/webpage.module.scss'

export default function Header(props) {

    return (
        <>
            
            <header>
                <div className={styles.container}>
                    <div className={styles.brand}>
                        <Link href="/"><span><Image width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} src="/assets/images/logo.png" alt={''} /></span>{`${appData.siteName}`}</Link>
                    </div>
                    <nav className={styles.menu}>
                        {props.menu}
                    </nav>

                </div>
            </header>

        </>
    )
}

