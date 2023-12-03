import styles from '../src/styles/Welcome.module.css'
import Link from 'next/link';

export default function Navbar() {
    return (
        <div>
            <h5 className={styles.title_results}><Link href="/">MovieHut.pt</Link></h5>
        </div>
    )
}