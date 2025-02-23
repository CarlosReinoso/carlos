"use client";

import Typography from "./common/Typography";

const BioSection = () => {
  return (
    <div
      id="bio"
      className="relative min-h-[100vh] mt-32 scroll-mt-24 sm:mt-8 flex items-center justify-center bg-primary p-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl overflow-hidden">
        {/* Left side - Bio Text */}
        <div className="flex flex-col justify-start items-start p-6 md:p-8 w-full">
          <Typography
            variant="h3"
            className="font-semibold tracking-widest text-lg sm:text-xl mb-2"
          >
            BIO
          </Typography>
          <hr className="w-full border-t-2 border-gray-600 mb-4" />
          <Typography
            variant="body1"
            className="text-gray-800 text-base sm:text-lg leading-relaxed space-y-4"
          >
            <p>
              Keanu Arcadio is a British writer born and raised in London. He
              began writing short stories in art school. His short stories cover
              relationships, cities, friendship, race, class, and the everyday.
            </p>
            <p>
              His literature takes on a range of influences such as: D.H.
              Lawrence, Jack London, Woolf, Henry Miller, Lu Xun, Dostoevsky,
              Murakami, William Carlos Williams, Raymond Carver, Orwell, Don
              DeLillo, Joan Didion, Sherman Alexie, Junot Díaz, Bruce Nauman,
              Duchamp, Jenny Holzer, Hegel, Emerson, and others.
            </p>
            <p>
              He writes in a direct way often resulting vulgarities. His
              literary style bleeds between modernist tropes to 19th century
              realism formalism to contemporary sparsity.
            </p>
            <p>
              He teaches AP courses to high school students in a bilingual
              school in Beijing when he is not writing. As of now, he is a
              Beijinger.
            </p>
          </Typography>
        </div>

        {/* Right side - Image */}
        <div className="flex justify-center items-center bg-secondary h-[60vh] sm:h-[70vh] md:h-[80vh] p-4 sm:px-8 md:px-12">
          <img
            src="/squat.jpg"
            alt="Keanu Arcadio sitting with sculptures"
            className="w-full h-full object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export default BioSection;
