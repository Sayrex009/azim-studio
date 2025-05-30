import Image from 'next/image';
import FaqLists from './../../components/FaqLists';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/footer';
import ImageCard from '@/app/components/ImageCard';
interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  category: number;
}

interface Props {
  params: {
    id: string;
  };
}

// Function for api
async function getServicesByCategory(categoryId: string): Promise<Service[]> {
  const res = await fetch(`https://kasimov.repid.uz/api/v1/common/services/${categoryId}/`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch services');
  }
  return res.json();
}

export default async function CategoryPage({ params }: Props) {
  const { id } = params;
  const services = await getServicesByCategory(id);

  return (
    <main>
      <Navbar />
      <section className="py-16 px-4 sm:px-8 lg:px-16 min-h-screen">
        <h1 className="text-white text-center text-4xl sm:text-5xl font-bold mb-12">
          Services in category {id}
        </h1>

        {services.map((service) => (
          <ImageCard
            key={service.id}
            src={service.image.startsWith('http')
              ? service.image
              : `https://kasimov.repid.uz${service.image}`}
            alt={service.title}
            title={service.title}
            description={service.description}
          />
        ))}
      </section>
      <div className="bg-[#18202D] py-24 text-center">
        <p className="text-white text-[14px] sm:text-[16px] md:text-[20px] lg:text-[28px] leading-relaxed">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..."
        </p>
      </div>
      <FaqLists />
      <Footer />
    </main>
  );
}
