import { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";

const ProfileSetup = () => {
  const [image, setImage] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACUCAMAAABGFyDbAAAAMFBMVEXk5ueutLepsLPZ3N7n6erIzM7P0tTq7O2yuLvBxsje4eLV2NrR1da2u767wMPEycvljgLtAAADY0lEQVR4nO2byXLbMAxAuYDiou3//7akXLfxIosABciZ4bskMz3kDQiBC1ClOp1Op9PpdDqdTqfT6XR+DQDPv1wOeGUHF5dMjG6yX2EGaopaa6Nv5J8hWnWxGaR1vhv9x4ThWrGoX6VuXCcGbleqRGy8xAvSsut0I15hZQ+kcsDmJG41HVoVkuxCwrSfVQ9YSS8Y6qRKvAStxspYZYKcVwrVVlrPUsvoZ4SVNk7GC4b6JdwYRbSOC9YTQSJc/qi4v2AGfi+wyCXUMl8jOlgiWY/OrA1uLYj4Nczh4j7kAMVK64XZCrHt/IQ56YGQ8AUzsWop1L7zg8iaXLTvsOA5tYiplVeR0wocWctyakWiVc55xuTCnbQe4Nx/POZY+gjnp+ipqZXrfNfqWh+1vjTlv7NA0A6BBdZy+qWbT8NWzXuwIec868GGch3bgsV7DKQeIQzvOwTlTl3gvlcT6zxnjS/QSgT79ZV4yeD9DhUt6c3AbaVU+s6HJI/eF1n3w38kdLBE3nTRT7pCL/OwYLykHsAV7oFkYS8OdzBbkGBzRcFYrSXaG65+FRRt3NXGK4j30SF96J/fMItw8/XG0e4oVxkegOnjwIFwWv3wgjW8FzNBZB/cFUvuVcyYebp8ygZsnENW+Wukw+wuyfQXQNlxWMukVHTD+B2DUgXY8N5vP6+2UUXIg0o5WIPbGHK0bMqG132F+boxuvh6+y+TZcs62iQ+kQc+jW6ZjdmtW/mfstuQxMzyH7Ku/sC1jkqgWOR6sM77QXoXtxCZq1jO7oH2ksQ4xQh+3B8FPIzZwjMsCGp8MzOJIbjTxcBPqOvO+4jNZ4tZ4ivgM+HE1whIa3Ok7pjltGNY/TWnSuyUlQRFbhHsec3tAQO7c/5sovWUXz3IicO0DfDSezxHhBYtNqvsRU4waCzrnzHUE397Xf8MKV5Ab2nWQokXY17dwb99wXn7zScvZLioU21IsP081DB1ixdqUrahg4/1wiwh9uW9AcSMpdQSblQPM+K7Ok1Uv9uLWtVmPX3SjsZcFyvRzNK1TVDJz/DGXJNdDcNQREzN1kho+rayHic9OHGrqqQ/6f6MoeKAI/0dFiomcOgz3g1ax/dGmYPWE4eNY/qYXQuHlQsWcwWHBdVegcx/fut0Op1O5xfyBzfiKaWdaPkVAAAAAElFTkSuQmCC"
  );
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [showDefaultImages, setShowDefaultImages] = useState(false);

  // Create a ref for the file input
  const fileInputRef = useRef(null);

  // Default images for the gallery
  const defaultImages = [
    "https://picsum.photos/192?random=1",
    "https://picsum.photos/192?random=2",
    "https://picsum.photos/192?random=3",
    "https://picsum.photos/192?random=4",
    "https://picsum.photos/192?random=5",
    "https://picsum.photos/192?random=6",
    "https://picsum.photos/192?random=7",
    "https://picsum.photos/192?random=8",
  ];

  // Handle back button click
  const handleBack = () => {
    console.log("Back button clicked");
    // Add navigation logic here (e.g., using react-router-dom)
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click using the ref
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle location submission
  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) {
      setError("Please enter a valid location.");
      return;
    }
    setError("");
    console.log("Location submitted:", location);
    // Add logic to proceed to the next step
  };

  // Handle Enter key press in location input
  const handleLocationKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLocationSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="p-2 rounded-full border hover:bg-gray-50 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
          {/* Left: Image Showcase */}
          <div className="relative flex flex-col items-center space-y-6 w-full lg:w-1/2">
            <h2 className="text-xl font-semibold text-center">
              Add your profile picture
            </h2>
            <div className="relative w-32 h-32 sm:w-48 sm:h-48">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/192"; // Fallback image
                  }}
                />
              </div>
            </div>
            <div className="space-y-2 text-center w-full">
              <button
                type="button"
                className="w-full sm:w-auto px-4 py-2 border rounded-full hover:bg-gray-50 transition-colors"
                onClick={handleImageUploadClick}
                aria-label="Upload profile picture"
              >
                Choose Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <p className="text-sm text-gray-500">
                Or{" "}
                <button
                  type="button"
                  className="underline hover:text-gray-700"
                  onClick={() => setShowDefaultImages(true)}
                >
                  choose one
                </button>{" "}
                of our defaults
              </p>
            </div>

            {/* Default Image Gallery Overlay */}
            {showDefaultImages && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center p-4 z-10">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {defaultImages.map((img, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setImage(img); // Set the selected image
                        setShowDefaultImages(false); // Close the gallery
                      }}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={img}
                        alt={`Default ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-4 text-blue-600 underline"
                  onClick={() => setShowDefaultImages(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div className="space-y-8 w-full lg:w-1/2">
            <div className="space-y-2 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold">
                Welcome! Let's create your profile
              </h1>
              <p className="text-gray-500">
                Let others get to know you better!
              </p>
            </div>
            <form onSubmit={handleLocationSubmit} className="space-y-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Add your location</h2>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={handleLocationKeyDown}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-black"
                  placeholder="Enter your location"
                  aria-label="Enter your location"
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <div className="flex justify-center lg:justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
