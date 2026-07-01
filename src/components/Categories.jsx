import "./Categories.css"
import React, { forwardRef } from "react"
import { Link } from "react-router-dom";

import skinImg from "../assets/skin.jpg";
import makeupImg from "../assets/makeup.jpg";
import hairImg from "../assets/hair.jpg";

const categories = [
    {
        id: 1,
        name: "Skincare",
        image: skinImg
    },
    {
        id: 2,
        name: "Makeup",
        image: makeupImg
    },
    {
        id: 3,
        name: "Haircare",
        image: hairImg
    }
];


const Categories = forwardRef((props, ref) => {
    return (
        <section className="categories" ref={ref}>
            <h2>Shop by categories</h2>
            <div className="category-container">
                {categories.map((item) => (
                    <div className="category-card" key={item.id}>
                        <img src={item.image} alt={item.name} />

                        <div className="overlay">
                            <h3>{item.name}</h3>
                            <Link to={`/${item.name.toLowerCase()}`}>
                                <button>Explore</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
});

export default Categories;