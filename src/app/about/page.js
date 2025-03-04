import Typography from "@/components/common/Typography";

export default function AboutPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 lg:px-24 py-12 mt-24">
      {/* Grid layout with image on top for mobile */}
      <div className="flex flex-col justify-center items-center">
        <img
          src="/about-grace.jpg"
          alt="Grace Basak in the studio"
          className="shadow-lg w-full max-w-sm object-cover rounded-lg"
        />
        <Typography variant="body2" className="text-center mt-4">
          “The creative process is a process of surrender, not control” –{" "}
          <em>Julia Cameron</em>
        </Typography>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-12 items-center bg-white shadow-lg rounded-2xl p-8 md:p-12 max-w-3xl w-full">
        {/* Right Section - Image (Shows first on mobile) */}
        {/* Heading */}

        {/* Body Content - Stacked paragraphs with spacing */}
        <div className="mt-6 space-y-6 text-gray-700">
          <Typography variant="h2" className="text-center text-gray-900">
            About Grace Basak.
          </Typography>
          <Typography variant="body2">
            Welcome to my world of artistry and heartfelt expression. I am
            Grace, a dedicated UK artist specialising in oil paintings. With
            each brush stroke, I pour my heart and soul into creating pieces
            that evoke emotions, ignite imagination, and hope to leave a lasting
            impression. My background has been in sculpting, TV, and Psychology.
          </Typography>

          <Typography variant="body2">
            My artistic journey began with an unwavering passion for the beauty
            that surrounds us. From the graceful flight of birds to the
            mesmerising presence of animals and the ethereal essence of ancient
            deities, I find inspiration in the diverse wonders of nature,
            spirituality, and mythology. Through my art, I strive to capture not
            just the physical likeness but also the essence of my subjects, and
            give the viewer a glimpse of how I see the world.
          </Typography>

          <Typography variant="body2">
            Working primarily with oil paints, I relish the vibrant colours,
            rich textures, and endless possibilities they offer. This
            traditional medium allows me to bring depth and a timeless quality
            to my creations. Each piece is meticulously crafted, layer by layer,
            to convey a sense of realism while retaining a touch of artistic
            interpretation. My creative process goes beyond technical mastery;
            it is a connection between my inner world and the subject matter. I
            believe that art has the power to transcend boundaries and forge
            connections on a deeper level.
          </Typography>

          <Typography variant="body2">
            As you explore my portfolio, I hope you will be drawn into the
            emotions and stories woven into each brushstroke, inviting you to
            experience moments of contemplation, joy, and wonder. I am thrilled
            to share my artwork with you and extend an invitation to discover
            the beauty and depth within my paintings.
          </Typography>

          <Typography variant="body2">
            Whether you are an art enthusiast, a collector, or someone seeking a
            captivating piece to adorn your living space, I hope you find
            solace, inspiration, and a renewed appreciation for the world we
            inhabit. Thank you for visiting, and I look forward to embarking on
            this artistic journey together.
          </Typography>
        </div>
      </div>
    </section>
  );
}
