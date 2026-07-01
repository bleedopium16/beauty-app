
import "./Testimonials.css"

function Testimonials() {

  const testimonials = [
    {
      id: 1,
      name: "Kenz",
      text: "My skin has never felt this soft and radiant. Absolutely love it!",
      emoji:"⭐⭐⭐⭐⭐"
    },
    {
      id: 2,
      name: "Kashaf",
      text: "The products feel so premium and gentle. Totally worth it.",
      emoji:"⭐⭐⭐⭐ "
    },
    {
      id: 3,
      name: "Bhumika",
      text: "I noticed visible glow in just a few days. Highly recommended!",
      emoji:"⭐⭐⭐⭐⭐"
    }
  ];

  return (
    <section className="testimonials">

      <h2>What Our Customers Say</h2>

      <div className="testimonial-container">
        {testimonials.map((item) => (
          <div className="testimonial-card" key={item.id}>
            <p>"{item.text}"</p>
            <h4>- {item.name}</h4>
            <h4>{item.emoji}</h4>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Testimonials;