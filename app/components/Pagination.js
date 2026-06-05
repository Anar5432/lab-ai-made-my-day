import styles from "./Pagination.module.css";

// Prev / Next pagination controls.
export default function Pagination({ page, onPrev, onNext }) {
  return (
    <div className={styles.container}>
      <button
        onClick={onPrev}
        disabled={page === 1}
        className={page === 1 ? styles.buttonDisabled : styles.button}
      >
        Previous
      </button>

      <span className={styles.pageText}>Page {page}</span>

      <button
        onClick={onNext}
        className={styles.button}
      >
        Next
      </button>
    </div>
  );
}
