import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoaderSkeleton = () => {
  return (
    <div
      id="global-loader"
      className="fixed inset-0 min-w-[100vh] z-[9999] bg-white flex flex-col items-center justify-start"
    >
      {/* Navbar */}
      <div className="w-full flex justify-center shadow-md mb-6">
        <Skeleton height={60} width="100vw" />
      </div>

      {/* HeroSection */}
      <div className="w-full flex justify-center shadow-md mb-10">
        <Skeleton height={400} width="100vw" />
      </div>

      {/* Primer bloque de contenido */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 px-4 mb-10">
        <div className="flex-1 shadow-md">
          <Skeleton height={40} width={250} style={{ marginBottom: 12 }} />
          <Skeleton count={3} height={20} style={{ marginBottom: 8 }} />
        </div>
        <div className="flex-1 flex items-center justify-center shadow-md">
          <Skeleton height={220} width={320} />
        </div>
      </div>

      {/* Segundo bloque de contenido */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 px-4">
        <div className="flex-1 flex items-center justify-center shadow-md">
          <Skeleton height={220} width={320} />
        </div>
        <div className="flex-1 shadow-md">
          <Skeleton height={40} width={250} style={{ marginBottom: 12 }} />
          <Skeleton count={5} height={20} style={{ marginBottom: 8 }} />
        </div>
      </div>
    </div>
  );
};

export default LoaderSkeleton;