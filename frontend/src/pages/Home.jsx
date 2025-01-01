import Navbar from "../components/NavBar";

const Home = () => {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background-image.jpg')" }}>
      {/* Navbar */}
      <Navbar />

      {/* Description Section */}
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="bg-white bg-opacity-90 shadow-md rounded-md p-8 max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown-700 mb-6">
            BonStay always provides you an amazing and pleasant stay
          </h2>
          <p className="text-lg md:text-xl text-gray-700">
            with your friends and family at reasonable prices. We provide well-designed space with modern amenities. You can reserve a room faster with our efficient BonStay app.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;