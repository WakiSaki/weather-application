import styles from "./Skeleton.module.css";

interface SkeletonProps {
    width?: string;
    height?: string;
    radius?: string;
    className?: string;
}

export default function Skeleton({ width = "100%", height = "1rem", radius = "6px", className = "" }: SkeletonProps) {
    return (
        <span
            aria-hidden="true"
            data-testid="skeleton"
            className={`${styles.skeleton} ${className}`}
            style={{ width, height, borderRadius: radius }}
        />
    );
}
