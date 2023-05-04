import React from "react";
import "./Paginado.css";

export default function Paginado({charactersPerPage, allCharacters, paginado}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allCharacters / charactersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="nav-paginado">
            <ul className="paginado">
                {pageNumbers &&
                    pageNumbers.map((number) => (
                        <li key={number} className="page-item">
                            <a onClick={() => paginado(number)} className="page-link" href="#!">
                                {number}
                            </a>
                        </li>
                    ))}
            </ul>
        </nav>
    );
}