import Description from './components/Description'
import Images from './components/Images'
import Rating from './components/Rating'
import RestaurantNavbar from './components/RestaurantNavbar'
import Reviews from './components/Reviews'
import Title from './components/Title'
import ReservationCard from './components/ReservationCard'
import { PrismaClient, Review } from '@prisma/client'
import { notFound } from 'next/navigation'

interface RestaurantDetailsType {
  id: number
  name: string
  description: string
  images: string[]
  slug: string
  reviews: Review[]
  open_time: string
  close_time: string
}

const prisma = new PrismaClient()

const fetchRestaurantBySlug = async (
  slug: string
): Promise<RestaurantDetailsType> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  })
  if (!restaurant) notFound()
  return restaurant
}

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string }
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug)
  return (
    <>
      <div className='bg-white w-[70%] rounded p-3 shadow'>
        <RestaurantNavbar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className='w-[27%] relative text-reg'>
        <ReservationCard
          openTime={restaurant.open_time}
          closeTime={restaurant.close_time}
          slug={restaurant.slug}
        />
      </div>
    </>
  )
}
