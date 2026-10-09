import styles from "@/components/AlertMessage.module.css";

export default function AlertMessage({ message }: { message: string }) {
    return (
        <div className={styles.container}>
            <p>{message}</p>
        </div>
    )
}