export default function AboutSection() {
  return (
    <section className="bg-[#F8F5F2] py-16 px-6 lg:px-24 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900">
          Featured works, the imaginative world of Grace Basak
        </h2>
        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
          Grace is an artist from Surrey currently based in London Hackney. She
          studied sculpting working at Madame Tussauds for a time and went on to
          teach herself the art of oil paintings.
        </p>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Her unique style captures the essence of the subject, whether it be
          the flight of a bird, the soul’s essence in a portrait, or the
          contours of our imagination. Inspiration comes from the beauty that
          surrounds us and within us.
        </p>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Working primarily with oil paints, she relishes the vibrant colours,
          rich textures, and endless possibilities they offer. This traditional
          medium allows her to bring depth and a timeless quality to her
          creations. She believes in keeping this traditional art alive.
        </p>
        <div className="mt-8">
          <a
            href="/gallery"
            className="bg-gray-900 text-white px-6 py-3 rounded-full text-lg font-semibold transition hover:bg-gray-700"
          >
            Explore the Gallery
          </a>
        </div>
      </div>
    </section>
  );
}
