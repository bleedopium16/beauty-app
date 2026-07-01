import "./Featured.css"
import featuredImg from "../assets/featured.jpg";
function Featured({scrollToCategory}) {
    return (
        <section className="featured">
            <div className="featured-container">
                <div featured-text>
                    <h2 className="h-1">Summer Beauty sale</h2>
                    <h2 className="h-1">Up to 40% OFF</h2>
                    <p className="p-2">
                        Fresh formulas. Soft hues. Skin that glows like summer mornings
                    </p>
                    <button className="btn-0" onClick={scrollToCategory}>Shop Now</button>
                </div>
            
                <div className="image0">
                    <img className="image1" src={featuredImg} alt="featured" />
                </div>
            </div>


        </section>
    )
}
export default Featured