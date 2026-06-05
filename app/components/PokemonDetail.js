"use client";

import { useEffect, useState } from "react";
import { getPokemonId, getPokemonImage } from "../lib/pokeapi";
import styles from "./PokemonDetail.module.css";

// Expanded "detail card" shown on top of the page when a Pokémon is clicked.
// It fetches the full details (types, stats, height, weight) for that Pokémon.
export default function PokemonDetail({ pokemon, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function loadDetails() {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      setDetails(data);
    }
    loadDetails();
  }, [pokemon]);

  const id = getPokemonId(pokemon.url);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
      >
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <img
          src={getPokemonImage(id)}
          alt={pokemon.name}
          className={styles.image}
        />

        <h2 className={styles.name}>
          {pokemon.name}
        </h2>
        <p className={styles.id}>#{String(id).padStart(3, "0")}</p>

        {!details ? (
          <p className={styles.loading}>Loading details…</p>
        ) : (
          <div className={styles.details}>
            <div className={styles.types}>
              {details.types.map((t) => (
                <span
                  key={t.type.name}
                  className={styles.typeBadge}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <p className={styles.detailText}>
              <strong>Height:</strong> {details.height / 10} m
            </p>
            <p className={styles.detailText}>
              <strong>Weight:</strong> {details.weight / 10} kg
            </p>

            <h3 className={styles.sectionTitle}>Base stats</h3>
            {details.stats.map((s) => (
              <div
                key={s.stat.name}
                className={styles.statRow}
              >
                <span className={styles.statName}>{s.stat.name}</span>
                <span className={styles.statValue}>{s.base_stat}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
