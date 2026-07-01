import "./Hero.css"
import heroImages from "../assets/hero-2.jpg";
function Hero({ scrollToCategory }) {
    return (
        <section className="hero" style={{ backgroundImage: `url(${heroImages})` }} >
            <div className="hero-content">
                <h1>Beauty that Begins with You</h1>

                <p>
                    Premium skincare designed to bring out your most luminous self.
                </p>

                <button onClick={scrollToCategory}>Shop the Collection</button>
            </div>
        </section>
    )
}
export default Hero;